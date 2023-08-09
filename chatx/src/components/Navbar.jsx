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
  top: 0%;
  width: 100%;
  z-index:111;
  background-color:white;
  color:"lightblue"
`


const Navbar = () => {
  return (
    <Nav>chatX</Nav>
  );
}

export default Navbar