import styled from "styled-components";
import githubLogo from "./assets/github.png";
const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
`;
const Logo = styled.div`
  font-weight: bold;
  font-size: 20px;
`;
const NavLinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const NavLink = styled.div``;
export const Navbar = (themeToggle) => {
  return (
    <NavbarWrapper>
      <Logo>Trivia</Logo>
      <NavLinksWrapper>
        <NavLink>Play</NavLink>
        <NavLink>About</NavLink>
        <NavLink>
          <img src={"./assets/github.png"} alt="test" />
          <img src={"./assets/github.png"} />
        </NavLink>
        <NavLink>
          <button onClick={themeToggle}>test</button>
        </NavLink>
      </NavLinksWrapper>
    </NavbarWrapper>
  );
};
