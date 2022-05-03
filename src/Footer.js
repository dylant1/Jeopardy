import styled from "styled-components";
import githubLogo from "./assets/github.png";
import linkedinLogo from "./assets/linkedin.png";
import instagramLogo from "./assets/instagram.png";
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
    height: 80px;    
    font-size: 15px;  

  }
  @media (max-width: 480px) {
    height: 60px;  
    font-size: 10px;  
  }
  @media (max-width: 319px) {
    height: 40px;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Image = styled.img`
  width: 30px;
  @media (max-width: 1024px) {
    width: 30px;
  }
  @media (max-width: 768px) {
    width: 25px;
  }
  @media (max-width: 480px) {
    width: 20px;
  }
  @media (max-width: 319px) {
    width: 15px;
  }
`;
const Linkedin = styled.img`
  width: 40px;
  @media (max-width: 1024px) {
    width: 40px;
  }
  @media (max-width: 768px) {
    width: 35px;
  }
  @media (max-width: 480px) {
    width: 25px;
  }
  @media (max-width: 319px) {
    width: 15px;
  }
`;
const Link = styled.a`
  margin-left: 5px;
  margin-right: 5px;
`;
export const Footer = () => {
  return (
    <FooterWrapper>
      <IconWrapper>
        <Link>
          <Image
            src={githubLogo}
            style={{
              filter: "invert(1)",
            }}
          />
        </Link>
        <Link>
          <Linkedin src={linkedinLogo} />
        </Link>
        <Link>
          <Image src={instagramLogo} />
        </Link>
      </IconWrapper>
      Utilizes the OpenTDB Trivia API
    </FooterWrapper>
  );
};
