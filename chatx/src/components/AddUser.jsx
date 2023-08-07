import { Close } from '@mui/icons-material'
import React from 'react'
import { styled } from 'styled-components'

const NameContainer = styled.div`
    display: flex;
    place-items: center;
    padding: 3px 2px;
    margin: 1px 1px 2px 1px;
    background-color: lightpink;
    color: white;
    cursor: pointer;
    &:hover{
        cursor: pointer;
    }

`
const Name = styled.div`
    font-size: 12px;
    font-weight: bold;
`

const AddUser = ({user,handleFunction}) => {
  return (
    <NameContainer onClick={handleFunction}>
        <Name>{user.userName}</Name>
        <Close  style={{height:"13px"}} />
    </NameContainer>
  )
}

export default AddUser