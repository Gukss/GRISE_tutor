import React from 'react';
import styled from 'styled-components';
import {ReactComponent as TutorLogo} from '../../Image/TutorLogo.svg';
import { GoogleLoginButton } from "react-social-login-buttons";
export const TutorLoginPage = () => {
  //const redirectURL = `https://grise.p-e.kr/oauth2/authorization/google?redirect_uri=${window.location.origin}/RedirectTutor`;//서버닫히기전 LoginURL
  const mainURL = `http://grisetutor.netlify.com/tutorMain`;//오프라인시 메인URL로 이동
  return (
    <Wrap>
      <TutorLogo style={{ width: "100%", height: "100%" }}></TutorLogo>
      <a
        href={mainURL}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div style={{ width: "60%" }}>
          <GoogleLoginButton></GoogleLoginButton>
        </div>
      </a>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 1200px;
  height:100%;
  margin:0 auto;
  

  @media (max-width:1220px){
    width: 100%;
  }

  @media (max-width:768px){
    width: 100%;
  }

  @media (max-width:480px){
    width:100%;
    background-color:white;
  }
`

export default TutorLoginPage;