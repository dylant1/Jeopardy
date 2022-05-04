import styled from "styled-components";
import githubLogo from "./assets/github.png";
import linkedinLogo from "./assets/linkedin.png";
import instagramLogo from "./assets/instagram.png";
import { SocialIcon } from "react-social-icons";

const FooterWrapper = styled.div`
    width = 100%;
    background-color: #181818	;
    box-shadow: 0px 0 4px rgba(0, 0, 0, 0.8);
    color: #808080 !important;
    display: flex;
    flex-direction: column;
    height: 100px;
    align-items: center;
    justify-content: center;
    font-size: 15px;  
  @media (max-width: 1024px) {
    height: 100px;
    font-size: 15px;  

  }
  @media (max-width: 768px) {
    font-size: 15px;  

  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
  @media (max-height: 900px) {
    height: 80px;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 5px;
`;

const Link = styled.div`
  margin-left: 5px;
  margin-right: 5px;
`;
export const Footer = () => {
  return (
    <FooterWrapper>
      <IconWrapper>
        <Link>
          <SocialIcon
            url="https://github.com/dylant1/trivia-app"
            bgColor="white"
            style={{ height: 30, width: 30 }}
          />
        </Link>
        {/* <Link>
          <SocialIcon
            url="https://instagram.com/in/jaketrent"
            style={{ height: 30, width: 30 }}
            fgColor="white"
          />
        </Link> */}
        {/* <Link>
          <SocialIcon
            url="https://linkedin.com/in/dylantoth1"
            fgColor="white"
            style={{ height: 30, width: 30 }}
          />
        </Link> */}
      </IconWrapper>
      Utilizes the OpenTDB Trivia API
    </FooterWrapper>
  );
};
