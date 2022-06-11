import React,{useRef} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const RequestConsultItem = (props) => {
		const Navigate = useNavigate();
    const rejectBtnRef = useRef();
    const isReject = useRef(false);
    const containerRef = useRef();

		const ShowConsult = () => {
      if(isReject.current){return;}//거절한 피드백일경우 확인안됨
      Navigate("/tutorConsult", {
        state: {
          consult: props.consult,
          consultId: props.data?.consultId,
        },
      });
    };

    const RejectConsult = () =>{
      if(isReject.current){
        alert('거절한 요청입니다');
        return;
      }
      rejectBtnRef.current.style.backgroundColor="#B1B1B1";
      axios({
        method:'POST',
        url:`https://grise.p-e.kr/tutor/consults/${props.data?.consultId}/cancel`,
        headers: {
          Authorization: window.localStorage.getItem('token') ,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        props.PushReject(props.index);
        isReject.current=true;
      }).catch((error) => {
        rejectBtnRef.current.style.backgroundColor="#3a6c7b";
        console.log(error);
      });
    }
    return (
      <Container ref={containerRef}>
        <Content 
          onTouchStart={()=>{containerRef.current.style.borderColor='#3A6C7B';}}
          onTouchEnd={()=>{containerRef.current.style.borderLeftColor='transparent';containerRef.current.style.borderRightColor='transparent';}}
          onClick={ShowConsult}>
          <Title>{props.data?.title}</Title>
          <Name>{props.data?.tutee.name}</Name>
        </Content>
        <RejectBtn ref={rejectBtnRef} onClick={RejectConsult}>
          거절
        </RejectBtn>
      </Container>
    );
};

const Container = styled.div`
  height: 4.2rem;
  display: flex;
  border-left: transparent solid 0.2rem;
  border-right: transparent solid 0.2rem;
  border-bottom: #3A6C7B solid 0.2rem;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: bold;
  font-size: 2rem;
  flex-direction: row;
`;

const Content = styled.div`
  height: 2rem;
  width: 90%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  margin-left: 1.5rem;
  margin-top: 0.5rem;
  font-size: 1rem;
  text-align: left;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: bold;
  color: #3a6c7b;
  height: 1rem;
`;

const Name = styled.div`
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  margin-left: 1.5rem;
  margin-top: 0.5rem;
  /* height: 50%; */
`;

const RejectBtn = styled.div`
  /* width: 10%; */
  width: 5rem;
  height: 1.5rem;
  margin-top: 1.25rem;
  border-radius: 1rem;
  text-align: center;
  font-family: "Noto Sans CJK KR";
  font-style: normal;
  font-weight: bold;
  color: #fff;
  background-color: #3a6c7b;
  font-size: 0.8rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export default RequestConsultItem;