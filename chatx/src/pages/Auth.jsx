import { Fragment, useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import {  useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { LoginCall, SignupCall } from "../redux/apiCalls";
import { refreshState } from "../redux/userSlice";


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
      z-index: 1;
      opacity: 0;
    }
    50%,100% {
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
background-color: lightblue;

`
const RightdivOverlay = styled.div`
    flex:1 ;
    display: flex;
    width: 50%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: lightblue;
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
background-color:${(props)=> props.signup ? "lightblue": "lightblue"} ;
color: #FFFFFF;
width: 100%;
cursor: pointer;
&:active{
  transform: scale(0.9);
}
`

const AnimationButton = styled.button`
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
&:active{
  transform: scale(0.9);
}
`


const Auth = () => {
    const [animate, setAnimate] = useState(false)
    const [logIn, setLogIn] = useState(true)
    const [signUp, setSignUp] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentUser, error } = useSelector((state) => state.user)

    const [userCredentials, setUserCredentials] = useState({
        userName: "",
        password: "",
        email: ""
    })

    const handleChange = (e) => {
        setUserCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const handleLogin = (e) => {
        e.preventDefault()
        LoginCall(dispatch, userCredentials)

    }
    useEffect(() => {
        currentUser && navigate("/messenger")
        currentUser && logIn && toast("login Successful")
        currentUser && signUp && toast("signup Successful")
        // eslint-disable-next-line
    }, [currentUser])

    const handleSignUp = (e) => {
        e.preventDefault()
        SignupCall(dispatch, userCredentials)
    }

    const handleAnimation = (e, data) => {
        e.preventDefault();
        setAnimate(!animate)
        dispatch(refreshState())
        setUserCredentials({
            userName: "",
            password: "",
            email: ""
        })
        if (data === "signup") {
            setLogIn(false);
            setSignUp(true)
        } else {
            setLogIn(true)
            setSignUp(false)
        }
    }
    console.log(currentUser)
    return (
        <Fragment>
            <Container>
                <HeroDiv>
                    <Leftdiv className={(animate && "changePosition")} >
                        <Heading className="left">Login</Heading>
                        <Subtitle>Welcome back you've been missed!🙂 </Subtitle>
                        <Form onSubmit={(e) => handleLogin(e)}>
                            {error && <ErrorMsg> {(error === 401) && "Invalid Username or Password"}</ErrorMsg>}

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
                            {error && <ErrorMsg> {(error === 401) && "Username already taken"}</ErrorMsg>}
                            {error && <ErrorMsg> {(error === 403) && "Email already taken"}</ErrorMsg>}
                            <InputWrapper>
                                <Label>Email<RequiredSpan>*</RequiredSpan></Label>
                                <Input type="email" name="email" value={userCredentials.email} placeholder="johndoe@gmail.com" onChange={handleChange} required ></Input>
                            </InputWrapper>
                            <InputWrapper>
                                <Label>Username<RequiredSpan>*</RequiredSpan></Label>
                                <Input type="text" name="userName" value={userCredentials.userName} placeholder="john doe" onChange={handleChange} required ></Input>
                            </InputWrapper>
                            <InputWrapper>
                                <Label>Password<RequiredSpan>*</RequiredSpan></Label>
                                <Input type="password" name="password" value={userCredentials.password} placeholder="password" onChange={handleChange} required minLength={5}></Input>
                            </InputWrapper>
                            <ButtonWrapper>
                                <Button type="submit" signup={true}>Sign Up</Button>
                            </ButtonWrapper>
                        </Form>
                    </Rightdiv>
                    <OverlayContainer className={(animate && "changePosition")}>
                        <HeroDivOverlay className={(animate && "changePosition")}>
                            <LeftdivOverlay className={(animate && "changePosition")}>
                                <Heading className="left">chatX</Heading>
                                <AnimationButton onClick={(e) => handleAnimation(e, "login")}>Login</AnimationButton>
                            </LeftdivOverlay>
                            <RightdivOverlay className={(animate && "changePosition")}>
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
