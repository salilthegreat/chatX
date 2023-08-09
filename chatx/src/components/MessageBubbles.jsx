import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from 'styled-components'
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const MessageContainer = styled.div`
margin-bottom: 10px;
padding: 0px 10px;
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
overflow: hidden;
`

const UserImg = styled.img`
height: 20px;
width: 20px;
border-radius: 50%;
object-fit: cover;
cursor: pointer;
`

const UserMessage = styled.div`
    font-weight: 300;
    border-radius: 20px;
    padding: 5px 5px;
    max-width: 300px;
    background-color: ${props => props.own ? "lightgreen" : "lightpink"};
    color: ${props => props.own ? "black" : "white"};
    overflow: inherit;
    `

// const TimeAgo = styled.span`
//     font-weight: 300;
//     font-size: 11px;
//     `

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
      {/* <ReactTimeAgo date={Date.parse(message.createdAt) } locale="en-US"/> */}
    </MessageContainer>
  )
}

export default MessageBubbles