import React, { Fragment, useEffect, useRef, useState } from 'react'
import Navbar from "../components/Navbar"
import styled from "styled-components"
import { Search, Visibility } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { apiCallStart, logout } from '../redux/userSlice'
import { userRequest } from '../requestMethods'
import MessageUsers from '../components/MessageUsers'
import MessageBubbles from '../components/MessageBubbles'
import {  GetSenderDetails, GetSenderId } from '../configs/chatLogic'
import ChatLoader from '../configs/chatLoader'
import GroupChatModal from '../configs/groupChatModal'
import { useNavigate } from 'react-router-dom'
import UserDetailsModal from '../configs/userProfileModal'
import UpdateGroupChatModal from '../configs/updateGroupChatModal'

const Container = styled.div`
display: flex;
height: calc(100vh - 50px);
position: relative;
box-sizing: border-box;
`
const Left = styled.div`
flex: 1.5;
height: 100%;
background-color: whitesmoke;

`
const LeftWrapper = styled.div`
padding: 20px;
height: 100%;
box-sizing: border-box;
`
const LeftTop = styled.div`

`
const LeftTopHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`


const HeaderWrapper = styled.div`
    font-weight: 500;
    font-size: 18px;
    display: flex;
`


const Button = styled.button`
padding: 10px  ;
border: none;
border-radius: 10px;
font-weight: 400;
font-size: 14px;
background-color: lightpink;
color: #FFFFFF;
cursor: pointer;

&:active{
  transform: scale(0.9);
}
`

const SearchWrapper = styled.div`
display: flex;
align-items: center;
position: relative;
margin: 20px 0px;
`

const SearchInput = styled.input`
width: 80%;
padding: 5px 10px;
border-radius: 15px;
border: 1px solid gray;
outline: none;
font-weight: 400;
font-size: 13px;
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
margin-top: 20px;
display: flex;
flex-direction: column;
gap: 20px;
height: 85%;
overflow-y: scroll;
`

const ChatWrapper = styled.div`
    border-radius: 5px;
    color: white;
    padding: 5px;
`




const Middle = styled.div`
flex: 3;
background-color: whitesmoke;
height: 100%;
`
const MiddleWrapper = styled.div`
padding:0px 0px 0px 0px;
height: 100%;
box-sizing: border-box;
border-right:0.5px solid gray;
border-left:0.5px solid gray;


`
const MessageTop = styled.div`
height:calc(100% - 90px) ;
overflow-y: scroll;
`
const MiddleHeaderWrapper = styled.div`
    font-weight: 500;
    font-size: 18px;
    display: flex;
    background-color: lightblue;
    align-items: center;
    justify-content: space-between;
    padding: 0px 5px;
`

const MessageBanner = styled.div`
    background-color: lightblue;
    padding:15px 5px;
    font-size: 20px;
    font-weight: 700;
`


const MessageBottom = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const MessageArea = styled.textarea`
width: 100%;
`

const SendButton = styled.button`
padding: 10px 10px;
border-radius: 10px;
background-color: lightgray;
color: white;
border: 1px solid gray;
outline: none;

`

const NoCoversation = styled.h1`
font-weight: 500;
opacity: 0.5;
height: 100%;
/* text-align: center; */
display: flex;
justify-content: center;
align-items: center;
`

const Right = styled.div`
flex: 1.5;
background-color: whitesmoke;

`
const RightWrapper = styled.div`
padding: 20px;
height: 100%;
box-sizing: border-box;

`
const MyProfile = styled.div`
        font-weight: 500;
    font-size: 18px;
    text-align: center;
`

const OnlineWrapper = styled.div`
height: calc(100% - 35px);

`
const MyProfilePic = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
`

const ProfileDetails = styled.div`
margin-top: 20px;
display: flex;
flex-direction: column;
align-items: center;
height: 100%;
gap: 10px;
overflow-y: scroll;
`

const ButtonWrapper = styled.div`
 display: flex;
 width: 100%;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 gap: 10px;
 
`
const MyButton = styled.button`
width: 70%;
padding: 7px  ;
border: none;
border-radius: 10px;
font-weight: 400;
font-size: 14px;
background-color: lightpink;
color: #FFFFFF;
cursor: pointer;

&:active{
  transform: scale(0.9);
}
`



const Messenger = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate("/")
    const { currentUser } = useSelector((state) => state.user)

    const [chats, setChats] = useState([])
    const [conversation, setConversation] = useState(null)
    const[selectedChat,setSelectedChat] = useState([])
    const[loading,setLoading] = useState(true)
    const[newMessage,setNewMessage] = useState("")
    const [query, setQuery] = useState("")
    const [searchedUser, setSearchedUser] = useState([])
    const[fetchAgain,setFetchAgain] = useState(false)

    //FETCH ALL CHATS OF USER
    useEffect(()=>{
        setLoading(true)
      const getChats = async()=>{
        try {
          const res = await userRequest.get("/chats/getallchat");
          setChats(res.data)
        } catch (error) {
          console.log(error)
        }
    }
    setLoading(false)
      getChats()
    },[fetchAgain])

    //SEARCH USER USING QUERY
    useEffect(()=>{
        setLoading(true)
      const searchUser =async()=>{
        try {
          const res = query.length >1 && await userRequest.get(`/auths/search?q=${query}`)
          console.log(res.data)
          setSearchedUser(res.data)
        } catch (error) {
          console.log(error)
        }
      }
      setLoading(false)
      searchUser()
    },[query])

    //CREATE OR FETCH A CONVERSATION ON CLICKING THE USER

    const handleInitiateConversation = async(recieverId)=>{
      try {
        const res = await userRequest.post("/chats/createchat",{recieverId});
        !chats.some((chat)=>chat._id === res.data._id ) && setChats((prev)=>[...prev,res.data])
        console.log(res.data)
        setQuery("")
        setSelectedChat(res.data)
        setConversation(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    const handleSelectConversation = (chat)=>{
        setSelectedChat(chat)
        setConversation(chat)
    }

    const handleUpdateProfile = () =>{

    }

    const handleLogout = () =>{
        dispatch(logout())
        navigate("/")
    }
    console.log(chats)

    return (
        <Fragment>
            <Navbar />
            <Container>
                <Left>
                    <LeftWrapper>
                        {loading && <ChatLoader/> }
                        <LeftTop>
                            <LeftTopHead>
                            <HeaderWrapper>
                                Recent Chats
                                </HeaderWrapper>
                            <GroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}  setSelectedChat={setSelectedChat} setConversation={setConversation}
                            >
                            <Button>New Group Chat +</Button>
                            </GroupChatModal>
                            </LeftTopHead>
                            <SearchWrapper>
                                <SearchInput placeholder='Search for friends...' onChange={(e) => setQuery(e.target.value)} />
                                <Search style={{ position: "absolute", right: "55px", height: "15px", color: "gray" }} />
                            </SearchWrapper>
                        </LeftTop>
                        {(query?.length >1 ) ?
                            <UserProfiles>
                                {searchedUser?.map((user) => (<>
                                    <Users onClick={()=>handleInitiateConversation(user._id)}>
                                        <UserImg src={user?.profilePicture ? user.profilePicture : 'http://localhost:5000/static/profilePic.png'} />
                                        <UserName>{user?.userName}</UserName>
                                    </Users>
                                </>))}
                            </UserProfiles> :
                            <UserProfiles >
                                {chats?.map((chat) => (
                                    <ChatWrapper style={{backgroundColor:(chat._id === selectedChat._id) ? "lightpink" : "lightblue" }}  onClick={()=>handleSelectConversation(chat)}>
                                        <MessageUsers  chat={chat} key={chat._id} />
                                    </ChatWrapper>
                                ))}
                            </UserProfiles>
                        }
                    </LeftWrapper>
                </Left>

                {/* Message Section */}

                <Middle>
                    <MiddleWrapper>
                        {conversation ? <>
                            <MessageTop>
                              <MiddleHeaderWrapper>
                                <MessageBanner>{(conversation.isGroupChat) ? conversation.chatName : GetSenderId(currentUser._id,conversation.members)}</MessageBanner>
                                {conversation.isGroupChat ? <UpdateGroupChatModal conversation={conversation}
                                setConversation={setConversation}
                                selectedChat={selectedChat}
                                setSelectedChat={setSelectedChat}
                                fetchAgain={fetchAgain}
                                setFetchAgain={setFetchAgain}
                                >
                                    <Visibility/>
                                </UpdateGroupChatModal> : 
                                <UserDetailsModal user={GetSenderDetails(currentUser._id,conversation.members)}>
                                <Visibility/>
                                </UserDetailsModal>
                                }
                                </MiddleHeaderWrapper>
                            </MessageTop>
                            <MessageBottom>
                                <MessageArea rows={5} name='message' value={newMessage?.message} onChange={(e) => setNewMessage((prev) => ({ ...prev, [e.target.name]: e.target.value }))} />
                                <SendButton >Send</SendButton>
                            </MessageBottom>
                        </>
                            : <NoCoversation>Select a chat ,to start a conversation</NoCoversation>}
                    </MiddleWrapper>
                </Middle>
                <Right>
                    <RightWrapper>
                        <MyProfile>Profile</MyProfile>
                        <OnlineWrapper>
                            <ProfileDetails>
                            <MyProfilePic src={currentUser?.profilePicture ? currentUser.profilePicture : "https://cdn-icons-png.flaticon.com/512/172/172163.png?w=1060&t=st=1691305872~exp=1691306472~hmac=3096a18a59c140eed2e3a902cb714c6f5df5bf71ad7cfe7f3a29487ee8ea3418" }/>
                            <UserName>{currentUser?.userName}</UserName>
                            <UserName>{currentUser?.email}</UserName>
                            <ButtonWrapper>
                        <MyButton onClick={handleUpdateProfile}>Update</MyButton>
                        <MyButton onClick={handleLogout} >LogOut</MyButton>
                        </ButtonWrapper>
                            </ProfileDetails>
                        </OnlineWrapper>
                    </RightWrapper>
                </Right>
            </Container>
        </Fragment>
    )
}

export default Messenger