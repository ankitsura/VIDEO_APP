import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { signIn, signInWithGoogle } from "../api";
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {

  const [formData, setFormData] = useState({userName: '', email: '', password: ''});
  const [isSignUp, setisSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const handleLogin = async (e) =>{
    e.preventDefault();
      dispatch(loginStart());
      signIn(formData).then((res) =>{
        dispatch(loginSuccess(res.data));
        navigate('/');
      }).catch((error) => {
        dispatch(loginFailure());
        console.log(error);
      });
  } 
    
  
  const handleSignup = () =>{

  }

  const signInUsingGoogle = async () =>{
    dispatch(loginStart());
    signInWithPopup(auth, provider)
    .then((result) => 
      signInWithGoogle({userName: result.user.displayName, email: result.user.email, img: result.user.photoURL})
    ).then((res) =>{ 
      dispatch(loginSuccess(res.data));
      navigate('/');
    }).catch((error) => {
      dispatch(loginFailure());
      console.log(error);
    })
  }
  const switchMode = async () =>{
    setisSignUp((previousState) => {
      return !previousState;
    })
  }

  return (
    <Container>
      <Wrapper>
        <Title>{isSignUp ? 'Sign Up' : "Sign In"}</Title>
        <SubTitle>to continue to YouTube</SubTitle>
        {
          isSignUp && <Input name="username" placeholder="username" value={formData.userName} onChange={handleChange}/>
        }
        <Input name="email" placeholder="email" value={formData.email} onChange={handleChange}/>
        <Input name="password" type="password" placeholder="password" value={formData.password} onChange={handleChange}/>
        {
          isSignUp 
          ?
          <Button onClick={handleSignup}>Sign up</Button>
          :
          <Button onClick={handleLogin}>Sign in</Button>
        }
        <Title>or</Title>
        <Button onClick={signInUsingGoogle}>Signin with Google</Button>
        <Button style={{backgroundColor: 'inherit', padding:0}} onClick={switchMode}>
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
