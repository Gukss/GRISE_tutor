import React, {useState, useEffect, useRef} from 'react'
import { useLocation } from "react-router-dom";
import styled from 'styled-components'
import NavBar from '../NavBar'
// import LoadingPage from "../LoadingPage";
import Comment from "./Comment";
// import axios from 'axios';
// import { Spin } from "antd";


const Board = () => {
  const location = useLocation();
	const [consult, SetConsult] = useState({});
	const videoRef = useRef(null);
	const [consultStart, SetConsultStart] = useState(false);
  const typeRef = useRef();
	const loadingRef = useRef(null);

	const ClickStart = () => {
    /*
		axios({
      method: "POST",
      url: `https://grise.p-e.kr/tutor/consults/${location.state.consultId}/startConsult`,
      headers: {
        Authorization: window.localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      typeRef.current.style.display = "none";
      alert("상담을 시작합니다.");
    })
    .then((res) => {
      SetConsultStart(true);
    })
    .catch((error) => {
      console.log(error);
    });
    */
    typeRef.current.style.display = "none";
    alert("상담을 시작합니다.");
    SetConsultStart(true);
	};

	useEffect(() => {
    if (location.state.consult === "consulting"){
      typeRef.current.style.display = "none";
    }
    /*
		axios({
      method: "GET",
      url: `https://grise.p-e.kr/tutor/consults/${location.state.consultId}`,
      headers: {
        Authorization: window.localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      SetConsult(res.data);
      videoRef.current.src=`https://grise.p-e.kr/video/${res.data.video.videoId}`;
      // loadingRef.current.style.display = "none";
    })
    .then((res) => {
      loadingRef.current.style.display = "none";
    })
    .catch((error) => console.log(error))
    */
    const temp = JSON.parse(window.localStorage.getItem(location.state.consult))[location.state.consultIndex];
    SetConsult({
      "consultId": temp.consultId,
      "title": temp.title,
      "content": "피드백본문3",
      "tutee":{
        "name": temp.tutee.name
      },
      "tutor":{
        "name": "김민영"
      },
      "video":{
        "videoId": 7
      },
      "commentList":[]
    });
    loadingRef.current.style.display = "none";
    videoRef.current.src = '/Videos/피드백동영상2.mp4';
	}, []);

	return (
		<Wrap>
			<Loading ref={loadingRef}>로딩중입니다</Loading>
      {/* <LoadingPage ref={loadingRef}> */}
      <NavBar />
      <StyledVideo>
        <video
          ref={videoRef}
          controls
          controlsList="nodownload"
          style={{ maxWidth: "100%", width: "auto", height: "15rem" }}
        />
      </StyledVideo>
      <StyledTitle>
        <StyledHeader>{consult?.title}</StyledHeader>
        <CompleteButton onClick={ClickStart} ref={typeRef}>
          상담 하기
        </CompleteButton>
      </StyledTitle>
      <StyledMainText>{consult?.content}</StyledMainText>
      <Comment
        consultId={location.state.consultId}
        tuteeName={consult?.tutee?.name}
        consultStart={consultStart}
        consultType={location.state.consult}
      />
      {/* </LoadingPage> */}
    </Wrap>
  );
};

const Loading = styled.div`
  display: block;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: bold;
  color: #fff;
  font-size: 3rem;
  text-align: center;
  line-height: 80vh;
  background-color: rgba(0, 0, 0, 0.8);
`;

const StyledMainText = styled.div`
  width: 97%;
  height: 3rem;
  margin: 0 auto;
  margin-bottom: 1rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  background-color: #fff;
`;

const CompleteButton = styled.button`
  width: 5rem;
  height: 1.5rem;
  font-size: 0.4rem;
  border-radius: 10px;
  font-weight: bold;
  background-color: #3a6c7b;
  border: none;
  color: #fff;
  margin: auto 0.3rem auto 0;
`;

const StyledTitle = styled.div`
  width: 97%;
  height: 10%;
  margin: 0 auto;
  border-bottom: #3a6c7b solid 1px;
  padding: 0.1rem 0;
  display: flex;
  justify-content: space-between;
`;

const StyledHeader = styled.div`
  width: 80%;
  height: 1rem;
  font-weight: bold;
  font-size: 0.7rem;
  color: #3a6c7b;
  margin: auto 0;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const StyledVideo = styled.div`
  width: 97%;
  margin: 0.5rem auto;
  text-align: center;
`;

const Wrap = styled.div`
  width: 1200px;
  height: 100%;
  margin: 0 auto;
	/* display: flex;
	flex-direction: column; */
  @media (max-width: 1220px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;


export default Board;