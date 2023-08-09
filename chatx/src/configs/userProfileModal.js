import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from 'styled-components';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
 /* justify-content: space-around; */
 flex-direction: column;
 justify-content: center;
 align-items: center;
 gap: 10px;
 
`
const UserName = styled.span`
font-size: 15px;
font-weight: 400;
cursor: pointer;
`
const MyButton = styled.button`
width: 70%;
padding: 7px  ;
border: none;
border-radius: 10px;
font-weight: 400;
font-size: 14px;
background-color: lightblue;
color: #FFFFFF;
/* width: 100%; */
cursor: pointer;

&:active{
  transform: scale(0.9);
}
`

export default function UserDetailsModal({children,user}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <span onClick={handleOpen}>{children}</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <RightWrapper>
                        <MyProfile id="modal-modal-title">Profile</MyProfile>
                        <OnlineWrapper>
                            <ProfileDetails id="modal-modal-description">
                            <MyProfilePic src={user?.profilePicture ? user.profilePicture : "https://cdn-icons-png.flaticon.com/512/172/172163.png?w=1060&t=st=1691305872~exp=1691306472~hmac=3096a18a59c140eed2e3a902cb714c6f5df5bf71ad7cfe7f3a29487ee8ea3418" }/>
                            <UserName>{user?.userName}</UserName>
                            <UserName>{user?.email}</UserName>
                            <ButtonWrapper>
                        {/* <MyButton onClick={handleUpdateProfile}>Update</MyButton> */}
                        <MyButton onClick={handleClose} >Close</MyButton>
                        </ButtonWrapper>
                            </ProfileDetails>
                        </OnlineWrapper>
                    </RightWrapper>
        </Box>
      </Modal>
    </div>
  );
}
