import React, { useEffect, useState } from "react";
import styled from "styled-components";
import jwtDecode from "jwt-decode";
import YouTube from "../img/logo.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import Upload from "./Upload";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const Img = styled.img`
  height: 25px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  /* background-color: #999; */
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage?.getItem('access_token')));
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setCurrentUser(null);
    navigate('/');
  }
  
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage?.getItem('access_token')));
    const token = currentUser?.token;
     if (token) {
       const decodedToken = jwtDecode(token);
       if(decodedToken.exp * 1000 < new Date().getTime()){
        handleLogout();
        }
      }
  }, [currentUser, location]);

  return (
    <>
      <Container>
        <Wrapper>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>
              <Img src={YouTube} />
              YouTube
            </Logo>
          </Link>
          <Search>
            <Input placeholder="Search" />
            <SearchOutlinedIcon />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon style={{cursor:'pointer'}} onClick={ () => setOpen(true) } />
              <Avatar src={currentUser.others?.img} />
              {currentUser.others.name}
              <Button onClick={handleLogout}>
                <AccountCircleOutlinedIcon />
                Logout
              </Button>
            </User>
            
          ) : ( location.pathname !== '/signin' &&
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )
          }
        </Wrapper>
      </Container>
      {
        open && <Upload setOpen={setOpen} />
      }
    </>
  );
};

export default Navbar;
