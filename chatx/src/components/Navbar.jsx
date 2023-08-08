import React from 'react'
import { styled } from 'styled-components'

const Nav = styled.div`
  height: 50px;
  display: flex;
  place-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 24px;
  position: sticky;
  /* position: absolute; */
  top: 0%;
  width: 100%;
  z-index:111;
  background-color:white
`
const SPAN1 = styled.span`
color:lightpink
`
const SPAN2 = styled.span`
color: lightblue;
`

const Navbar = () => {
  return (
    <Nav><SPAN1>chat</SPAN1><SPAN2>X</SPAN2></Nav>
  )
}

export default Navbar