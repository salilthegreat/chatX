import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from 'styled-components'

const MessageContainer = styled.div`
margin-bottom: 10px;
padding: 2px 10px;
display: flex;
flex-direction: column;
gap: 5px;
align-items: ${props => props.own ? "flex-end" : "flex-start"};
`

const MessageWrapper = styled.div`
display: flex;
gap: 5px;
align-items: center;
flex-direction:${(props) => props.own ? "row-reverse" : "row"};
/* overflow: hidden; */
`

const UserImg = styled.img`
height: 20px;
width: 20px;
border-radius: 50%;
object-fit: cover;
cursor: pointer;
`

const UserMessage = styled.p`
    font-weight: 300;
    border-radius: 20px;
    padding: 1px 5px;
    /* max-width: 300px; */
    background-color: ${props => props.own ? "#a2e5de" : "lightblue"};
    color: ${props => props.own ? "black" : "white"};
    /* overflow: inherit; */
    `



const MessageBubbles = ({ message }) => {
  const { currentUser } = useSelector((state) => state.user)
  const myMessage = currentUser?._id === message?.sender?._id
  // console.log(message)
  return (
    <MessageContainer own={myMessage ? "own" : ""} >
      <MessageWrapper own={myMessage ? "own" : ""}>
        <UserImg src={message?.sender?.profilePicture ? message.sender.profilePicture : 'http://localhost:5000/static/profilePic.png'} />
        <UserMessage own={myMessage ? "own" : ""} dangerouslySetInnerHTML={{__html:message.message}}></UserMessage>
      </MessageWrapper>
    </MessageContainer>
  )
}

export default MessageBubbles