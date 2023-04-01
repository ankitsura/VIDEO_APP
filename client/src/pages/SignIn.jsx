import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";

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
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const handleLogin = async (e) =>{
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/signin`, formData);
      dispatch(loginSuccess(res.data.others))
    } catch (error) {
      dispatch(loginFailure());
    }
  }
  const handleSignup = () =>{

  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to YouTube</SubTitle>
        <Input name="email" placeholder="email" value={formData.email} onChange={handleChange}/>
        <Input name="password" type="password" placeholder="password" value={formData.password} onChange={handleChange}/>
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Input name="username" placeholder="username" value={formData.userName} onChange={handleChange}/>
        <Input name="email" type='email' placeholder="email" value={formData.email} onChange={handleChange}/>
        <Input name="password" type="password" placeholder="password" value={formData.password} onChange={handleChange}/>
        <Button onClick={handleSignup}>Sign up</Button>
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
