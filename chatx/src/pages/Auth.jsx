import { Fragment, useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
// import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Container = styled.div`
height: 100vh;
padding: 5rem 9.75rem;
background-color: #FFF;
box-sizing: border-box;
`

const HeroDiv = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: all 06s ease-in-out;
  `
const slideAnimation = keyframes`
    0% ,49.99%{
      /* transform: translateX(0); */
      z-index: 1;
      opacity: 0;
    }
    50%,100% {
      /* transform: translateX(-100%); */
      opacity: 1;
      z-index: 5;
    }
  `;


const Leftdiv = styled.div`
    position: absolute;
    flex: 1 ;
    display: flex;
    width: 50%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid var(--border-blue);
    z-index: 2;
   transition: all 0.6s ease-in-out;
    &.changePosition{
        transform: translateX(100%);
    }
    `
const Rightdiv = styled.div`
        flex:1 ;
        display: flex;
        width: 50%;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 1;
        transition: all 0.6s ease-in-out;
        background-color: white;
        opacity: 0;
        &.changePosition{
            transform: translateX(100%);
            animation: ${slideAnimation} 0.6s forwards;
        }
        `

const OverlayContainer = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
    &.changePosition{
        transform: translateX(-100%);
    }
`

const HeroDivOverlay = styled.div`
  position: relative;
  display: flex;
    left: -100%;
    height: 100%;
    width: 200%;
    transition: transform 0.6s ease-in-out;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background: var(--secondary-blue);
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    &.changePosition{
        transform: translateX(50%);
    }
`

const LeftdivOverlay = styled.div`
flex: 1 ;
display: flex;
width: 50%;
height: 100%;
flex-direction: column;
justify-content: center;
align-items: center;
border-right: 1px solid var(--border-blue);
transform: translateX(0);
transition: transform 0.6s ease-in-out;
background-color: pink;

`
const RightdivOverlay = styled.div`
    flex:1 ;
    display: flex;
    width: 50%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: pink;
    /* background-color:${props => props.logo ? "white" : "transparent"}; */
`

const Heading = styled.h1`
&.left{
  font-weight: 700;
  font-size: 48px;
  color: var(--primary-blue);
}

&.right{
  font-weight: 700;
  font-size: 48px;
  color: var(--primary-blue);
  /* position: absolute;
  top: 57%; */
}
  `
const Subtitle = styled.p`
margin: 12px 0;
font-weight: 500;
font-size: 14px;
`
const Form = styled.form`
width: 60%;
display: flex;
flex-direction: column;
align-items: center;
`
const InputWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: column;
margin-bottom: 10px;
justify-content: space-between;
`

const Label = styled.label`
margin-bottom: 8px;
font-weight: 700;
font-size: 14px;

/* label.required:after{content:"*"} */
`
const RequiredSpan = styled.span`
  color: red;
  `

const Input = styled.input`
border: 0.5px solid gray;
padding: 10px 20px;
width: 200px;
outline: none;
border-radius: 5px;
font-size: 14px;
font-weight: 400;
align-self: stretch;
width: 100%;
box-sizing: border-box;
`
const ErrorMsg = styled.div`
  color: red;
  font-size: 11px;
  font-weight: 400;
  text-align: center;
  `

const ButtonWrapper = styled.div`
margin: 15px 0px;
text-align: center;
width: 100%;
`

const Button = styled.button`
/* width: 100%; */
padding: 10px 0px ;
border: none;
border-radius: 10px;
font-weight: 400;
font-size: 14px;
background-color: var(--secondary-blue);
color: #FFFFFF;
width: 100%;
cursor: pointer;
/* &:hover{
  background-color: var(--tertiary-blue);
} */
&:active{
  transform: scale(0.9);
}
`

const AnimationButton = styled.button`
/* width: 100%; */
padding: 10px 0px ;
border: none;
border-radius: 10px;
font-weight: 400;
font-size: 14px;
background-color: #FFFFFF;
border: 1px solid gray;
color: BLACK;
width: 40%;
cursor: pointer;
/* &:hover{
  background-color: var(--tertiary-blue);
} */
&:active{
  transform: scale(0.9);
}
`

const SignUpMsg = styled.p`
    margin-top: 5px;
    font-size: 14px;
    font-weight: 400;
    `
const Span = styled.span`
    color:var(--secondary-blue);
    cursor: pointer;
    font-weight: 800;
    `


const Logo = styled.img`
  width: 240px;
  mix-blend-mode: darken;
  
  `

const Auth = () => {
    const [animate, setAnimate] = useState(false)
    const [logIn, setLogIn] = useState(true)
    const [signUp, setSignUp] = useState(false)


    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setUserCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const handleLogin = (e) => {
        e.preventDefault()
        toast("login Successful")
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        toast("SignUp Successful")
    }

    const handleAnimation = (e, data) => {
        e.preventDefault();
        setAnimate(!animate)
        if (data === "signup") {
            setLogIn(false);
            setSignUp(true)
            setUserCredentials({
                email: "",
                password: ""
            })
        } else {
            setLogIn(true)
            setSignUp(false)
            setUserCredentials({
                email: "",
                password: ""
            })
        }
    }
    console.log(userCredentials)
    return (
        <Fragment>
            <Container>
                <HeroDiv>
                    <Leftdiv className={(animate && "changePosition")} >
                        <Heading className="left">Login</Heading>
                        <Subtitle>Welcome back you've been missed!🙂 </Subtitle>
                        <Form onSubmit={(e) => handleLogin(e)}>
                            <InputWrapper>
                                <Label htmlFor="email" >Email<RequiredSpan>*</RequiredSpan></Label>
                                <Input id="email" type="email" name="email" value={userCredentials.email} placeholder="johndoe@gmail.com" minLength={5} onChange={handleChange} required />
                            </InputWrapper>
                            <InputWrapper>
                                <Label>Password<RequiredSpan>*</RequiredSpan></Label>
                                <Input type="password" name="password" value={userCredentials.password} placeholder="password" minLength={5} onChange={handleChange} required />
                            </InputWrapper>
                            <ButtonWrapper>
                                <Button type="submit" >Login</Button>
                            </ButtonWrapper>
                        </Form>
                    </Leftdiv>
                    <Rightdiv className={(animate && "changePosition")}>
                        <Heading className="right">Signup</Heading>
                        <Subtitle>Welcome to Connect. Meet with people around the world🙂 </Subtitle>
                        <Form onSubmit={(e) => handleSignUp(e)}>
                            <InputWrapper>
                                <Label>Email<RequiredSpan>*</RequiredSpan></Label>
                                <Input type="email" name="email" value={userCredentials.email} placeholder="johndoe@gmail.com" onChange={handleChange} required ></Input>
                            </InputWrapper>
                            <InputWrapper>
                                <Label>Password<RequiredSpan>*</RequiredSpan></Label>
                                <Input type="password" name="password" value={userCredentials.password} placeholder="password" onChange={handleChange} required minLength={5}></Input>
                            </InputWrapper>
                            <ButtonWrapper>
                                <Button type="submit">Sign Up</Button>
                            </ButtonWrapper>
                        </Form>
                    </Rightdiv>
                    <OverlayContainer className={(animate && "changePosition")}>
                        <HeroDivOverlay className={(animate && "changePosition")}>
                            <LeftdivOverlay className={(animate && "changePosition")}>
                                {/* <Logo src="https://i.ibb.co/tX4fmGf/Whats-App-Image-2023-07-03-at-11-18-12.jpg" /> */}
                                <Heading className="left">chatX</Heading>
                                <AnimationButton onClick={(e) => handleAnimation(e, "login")}>Login</AnimationButton>
                            </LeftdivOverlay>
                            <RightdivOverlay className={(animate && "changePosition")}>
                                {/* <Logo src="https://i.ibb.co/tX4fmGf/Whats-App-Image-2023-07-03-at-11-18-12.jpg" /> */}
                                <Heading className="right">chatX</Heading>
                                <AnimationButton onClick={(e) => handleAnimation(e, "signup")} >SignUp</AnimationButton>
                            </RightdivOverlay>
                        </HeroDivOverlay>
                    </OverlayContainer>
                    {logIn && <ToastContainer />}
                    {signUp && <ToastContainer />}
                </HeroDiv>
            </Container>
        </Fragment>
    )
}


export default Auth
