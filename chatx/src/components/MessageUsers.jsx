import { useSelector } from 'react-redux'
import { styled } from "styled-components"



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

const MessageUsers = ({ chat }) => {
  const { currentUser } = useSelector((state) => state.user)
  const friend = chat?.members.filter((item) => item._id !== currentUser._id)[0]

  return (
    <>
      {(chat?.isGroupChat) ?
        <Users >
          <UserImg src='https://img.freepik.com/free-vector/character-illustration-people-holding-user-account-icons_53876-43022.jpg?w=1800&t=st=1691305960~exp=1691306560~hmac=adc17d188786071bc1604a15af03fb6aadf6831520d1c5d70ec96ac71fbe8466' />
          <UserName>{chat?.chatName}</UserName>
        </Users>
        :
        <Users >
          <UserImg src={friend?.profilePicture ? friend.profilePicture : 'https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg'} />
          <UserName>{friend?.userName}</UserName>
        </Users>

      }
    </>
  )
}

export default MessageUsers