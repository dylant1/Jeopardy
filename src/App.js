import { Home } from "./Home";
import styled from "styled-components";
import { Navbar } from "./Navbar";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { useState } from "react";
import moon from "./assets/moon.svg";
import sun from "./assets/sun.svg";
import { lightTheme, darkTheme } from "./Theme";
import { useEffect } from "react";
import "./global.css";
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
  font-size: 20px;
  display: flex;
  align-items: center;
`;
const NavLinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const NavLink = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
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
  }, []);
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {" "}
      <GlobalStyles />
      <PageWrapper>
        {" "}
        <NavbarWrapper>
          <Logo> Trivia</Logo>
          <NavLinksWrapper>
            <NavLink>Play</NavLink>
            <NavLink>About</NavLink>
            {/* <NavLink>
              <img src={githubIcon} width={30} alt="Github" />
            </NavLink> */}
            <NavLink>
              {" "}
              {theme === "light" ? (
                <span
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img src={sun} onClick={themeToggler} width={30} />
                </span>
              ) : (
                <span
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img src={moon} onClick={themeToggler} width={30} />
                </span>
              )}
            </NavLink>
          </NavLinksWrapper>
        </NavbarWrapper>
        <Home theme={theme} />
        {
          //add routes here
        }
        <div>footer</div>
      </PageWrapper>
    </ThemeProvider>
  );
}

export default App;
