import * as React from 'react';
import Modal from '@mui/material/Modal';
import { styled } from 'styled-components';
import { userRequest } from '../requestMethods';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddUser from '../components/AddUser';

const Container = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
width: 400px;
height: 300px;
background-color: whitesmoke;
padding: 4;
display: flex;
flex-direction: column;
place-items: center;
`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
width: 70%;
position: relative;
`

const Header = styled.h1`

`
const Input = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 15px;
    border: 1px solid gray;
`
const MyButton = styled.button`
width: 25%;
padding: 10px  ;
border: none;
border-radius: 10px;
font-weight: 400;
font-size: 14px;
background-color: lightblue;
color: #FFFFFF;
cursor: pointer;

&:active{
  transform: scale(0.9);
}
`
const Users = styled.div`
display: flex;
align-items: center;
gap: 30px;
`

const UserImg = styled.img`
height: 40px;
width: 40px;
border-radius: 50%;
object-fit: cover;
cursor: pointer;
`

const UserName = styled.span`
font-size: 15px;
font-weight: 400;
cursor: pointer;
`
const UserProfiles = styled.div`
margin: 20px;
display: flex;
flex-direction: column;
gap: 20px;
height: 85%;
overflow-y: scroll;
position: absolute;
top: 60%;
`
const InputWrapper = styled.div`
 display: flex;
 flex-direction: column;
 gap: 10px;
`

const ButtonWrapper = styled.div`
 display: flex;
 width: 100%;
 justify-content: flex-end;
 gap: 10px;
 
`

const AddUserWrapper = styled.div`
display: flex;
flex-wrap: wrap;
`

export default function BasicModal({ children, fetchAgain, setFetchAgain, setSelectedChat, setConversation }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [query, setQuery] = React.useState("")
    const [searchedUser, setSearchedUser] = React.useState([])
    const [addedTOGroup, setAddedToGroup] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [groupName, setGroupName] = React.useState("")


    //SEARCH USER USING QUERY
    React.useEffect(() => {
        setLoading(true)
        const searchUser = async () => {
            try {
                const res = query.length >= 1 && await userRequest.get(`/auths/search?q=${query}`)
                console.log(res.data)
                setSearchedUser(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        setLoading(false)
        searchUser()
    }, [query])

    const handleAddToGroup = (addUser) => {
        (!addedTOGroup.some((user) => user._id === addUser._id)) ?
            setAddedToGroup((prev) => [...prev, addUser]) :
            toast("User already added")
    }
    const handleRemoveFromGroup = (removeUser) => {
        setAddedToGroup(addedTOGroup.filter((user) => user._id !== removeUser._id))
    }

    const handleCleanUp = (response) => {
        setFetchAgain(!fetchAgain)
        setSelectedChat(response)
        setConversation(response)
        setAddedToGroup([])
        setTimeout(() => {
            handleClose()
        }, 500)
    }

    const handleCreateGroup = async () => {
        // e.preventDefault();
        if (groupName.length < 3 || addedTOGroup.length < 2) {
            toast("Please fillup all the fields")
        } else {
            try {
                const res = await userRequest.post(`/chats/groupchat`, {
                    chatName: groupName,
                    members: JSON.stringify(addedTOGroup.map((user) => user._id))
                })
                toast("Group created successfully")
                handleCleanUp(res.data)
            } catch (error) {
                console.log(error)
                toast(error.response.message)
            }
        }
    }
    return (
        <div>
            <span onClick={handleOpen}>{children}</span>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Container>
                    <Header id="modal-modal-title">Create A Group Chat</Header>
                    <Wrapper id="modal-modal-description" >
                        <InputWrapper>
                            <Input placeholder='Group Name' minLength={5} onChange={(e) => setGroupName(e.target.value)} />
                        </InputWrapper>
                        <InputWrapper>
                            <Input onChange={(e) => setQuery(e.target.value)} placeholder='Search for users' />
                            <AddUserWrapper>
                                {addedTOGroup.map((user) =>
                                    <AddUser user={user} key={user._id} handleFunction={() => handleRemoveFromGroup(user)} />
                                )}
                            </AddUserWrapper>
                        </InputWrapper>
                        <ButtonWrapper>
                        <MyButton onClick={handleCreateGroup}>Create</MyButton>
                        <MyButton onClick={handleClose} >Close</MyButton>
                        </ButtonWrapper>
                        <UserProfiles>
                            {searchedUser?.map((user) => (<>
                                <Users onClick={() => handleAddToGroup(user)}>
                                    <UserImg src={user?.profilePicture ? user.profilePicture : 'http://localhost:5000/static/profilePic.png'} />
                                    <UserName>{user?.userName}</UserName>
                                </Users>
                            </>))}
                        </UserProfiles>
                    </Wrapper>
                    <ToastContainer />
                </Container>
            </Modal>
        </div>
    );
}
