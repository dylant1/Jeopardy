import { Home } from "./Home";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { useState } from "react";
import moon from "./assets/moon.svg";
import sun from "./assets/sun.svg";
import { lightTheme, darkTheme } from "./Theme";
import { useEffect } from "react";
import { Footer } from "./Footer";
import "./global.css";
import { Route, Switch } from "react-router-dom";
import { About } from "./About";
import { Link } from "react-router-dom";

const PageWrapper = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;
const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
`;
const Logo = styled.div`
  font-weight: bold;
  font-size: 30px;
  display: flex;
  align-items: center;
  @media (max-width: 1024px) {
    font-size: 25px;
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 480px) {
    font-size: 20px;
  }
  @media (max-width: 319px) {
    font-size: 20px;
  }
`;
const NavLinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const NavLink = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-right: 10px;
  text-align: center;
  margin-left: 10px;
  justify-content: center;
  font-size: 20px;
  @media (max-width: 1024px) {
    font-size: 17px;
  }
  @media (max-width: 768px) {
    font-size: 15px;
  }
  @media (max-width: 480px) {
    font-size: 13px;
  }
  @media (max-width: 319px) {
    font-size: 20px;
  }
  &:hover {
    text-decoration: underline;
  }
  width: 100%;
`;
const Img = styled.img`
  max-width: 100%;
`;
const ImgWrapper = styled.div`
  width: 42px;
  @media (max-width: 1024px) {
    width: 38px;
  }
  @media (max-width: 768px) {
    width: 34px;
  }
  @media (max-width: 480px) {
    width: 30px;
  }
  @media (max-width: 319px) {
    width: 26px;
  }
`;

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
    } else if (theme === "dark") {
      localStorage.setItem("theme", "light");
    }
  };
  useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundColor = "#363537";
      document.body.style.color = "#FAFAFA";
    }
  }, [theme]);
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {" "}
      <GlobalStyles />
      <PageWrapper>
        {" "}
        <NavbarWrapper>
          <Logo> Trivia</Logo>
          <NavLinksWrapper>
            <Link
              to="/"
              style={
                theme === "light"
                  ? {
                      color: "black",
                      textDecoration: "none",
                      textAlign: "center",
                    }
                  : { color: "white", textDecoration: "none" }
              }
            >
              <NavLink>Play</NavLink>
            </Link>
            <Link
              to="/about"
              style={
                theme === "light"
                  ? { color: "black", textDecoration: "none" }
                  : { color: "white", textDecoration: "none" }
              }
            >
              <NavLink>About</NavLink>
            </Link>

            <NavLink>
              {" "}
              {theme === "light" ? (
                <ImgWrapper
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Img src={sun} onClick={themeToggler} />
                </ImgWrapper>
              ) : (
                <ImgWrapper
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Img src={moon} onClick={themeToggler} />
                </ImgWrapper>
              )}
            </NavLink>
          </NavLinksWrapper>
        </NavbarWrapper>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
        <Footer />
      </PageWrapper>
    </ThemeProvider>
  );
}

export default App;
