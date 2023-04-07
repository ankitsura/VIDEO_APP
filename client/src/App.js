import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage?.getItem('access_token'));
    setUser(user);
  }, [user]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                  <Route path="/" element={<Home type="random"/>} />
                  <Route path="/trends" element={<Home type="trend"/>} />
                  <Route path="/subscriptions" element={<Home type="sub"/>} />
                  <Route path="/signin" element={(!user ? <SignIn/> : <Navigate to="/" />)} />
                  <Route path="/video/">
                    <Route path=":id" element={<Video />} />
                  </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
