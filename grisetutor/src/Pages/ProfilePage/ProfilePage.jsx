import React,{useEffect,useRef,useState,useCallback} from "react";
import styled from 'styled-components';
import NavBar from '../NavBar';
import axios from 'axios';

const ProfilePage = ()=>{
  const [profile,SetProfile] = useState('');
  const submitingRef = useRef(null);

  useEffect(()=>{
    axios({
      method: "GET",
      url: `https://grise.p-e.kr/tutor/resume`,
      headers: {
        Authorization: window.localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      SetProfile(res.data.content);
    })
    .catch((error) => console.log(error));
  },[]);

  const ChangeProfile = useCallback((e)=>{
    SetProfile(e.target.value);
  },[]);
  
  const SubmmitProfile = (e)=>{
    submitingRef.current.style.display='block';
    axios.put(`https://grise.p-e.kr/tutor/resume`,{
      content:profile
    },{
      headers: {
        Authorization: window.localStorage.getItem("token"),
        "Content-Type": "application/json",
      }
    }).then((res) => {
      console.log(res);
      submitingRef.current.style.display='none';
    })
    .catch((error) => console.log(error));
  }

  return (
    <Wrap>
      <SubmitingDiv ref={submitingRef}>
        수정중입니다
      </SubmitingDiv>
      <NavBar />
      <ProfileTitleContainer>
        <ProfileTitle>프로필</ProfileTitle>
        <ProfileWarring>튜티에게 보여줄 정보를 입력해 주세요</ProfileWarring>
      </ProfileTitleContainer>
      <ProfileInput onChange={ChangeProfile} value={profile} id="profile" name="profile" type="Text" placeholder="피드백 받고싶은 내용을 입력해 주세요"></ProfileInput>
      <SubmmitButton onClick={SubmmitProfile}>수정</SubmmitButton>
    </Wrap>
  );
}

const ProfileTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const ProfileInput = styled.textarea`
  margin-left: 2.5%;
  width: 95%;
  size: 100%;
  height: 15rem;
  font-size: 1rem;
  text-align:left;
  border: none;
  border-bottom: #3A6C7B solid 0.1rem;
  font-family: 'Noto Sans CJK KR';
  font-style: normal;
  font-weight: 100;
  :focus {
    outline: none;
  }
`

const ProfileTitle = styled.div`
  margin-left: 0.5rem;
  display: block;
  font-size: 1rem;
  text-align:left;
  padding: 0.3rem;
  font-family: 'Noto Sans CJK KR';
  font-style: normal;
  font-weight: bold;
  color: #3A6C7B;
`

const ProfileWarring = styled.div`
  padding: 0.4rem;
  font-size: 0.8rem;
  color: #A0A0A0;
  font-family: 'Noto Sans CJK KR';
  font-style: normal;
  font-weight: 900;
`

const SubmitingDiv = styled.div`
  display: none;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-family: 'Noto Sans CJK KR';
  font-style: normal;
  font-weight: bold;
  color: #fff;
  font-size: 3rem;
  text-align: center;
  background-color: rgba(0,0,0,0.8);
`

const SubmmitButton = styled.div`
  position: absolute;
  z-index: 0;
  bottom: 1rem;
  left: 50%;
  margin-left: -6rem;
  border-radius: 0.5rem;
  width: 12rem;
  height: 3rem;
  float: left;
  font-size: 1rem;
  line-height: 2.5rem;
  text-align: center;
  font-family: 'Noto Sans CJK KR';
  font-style: normal;
  font-weight: bold;
  color: #fff;
  background-color: #3A6C7B;
`

const Wrap = styled.div`
  /* background-color: brown; */
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

export default ProfilePage;