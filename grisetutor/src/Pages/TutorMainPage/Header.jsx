import React, { useRef, useEffect,useState } from "react";
import styled from 'styled-components';
import ConsultList from './List/ConsultList';


const Header = () => {
  const NormalConsultHeaderRef = useRef(null);
  const RequestConsultHeaderRef = useRef(null);
  const NormalConsultListRef = useRef(null);
  const [LoadingNormalConsult,SetLoadingNormalConsult] = useState(false);
  const RequestConsultListRef = useRef(null);
  const [LoadingRequestConsult,SetLoadingRequestConsult] = useState(false);
  const consultingHeaderRef = useRef(null);
  const consultingListRef = useRef(null);
  const [LoadingConsulting,SetLoadingConsulting] = useState(false);
  useEffect(() => {
    onClickNormalConsultListBtn();
  }, []);

  const onClickNormalConsultListBtn = () => {
    NormalConsultHeaderRef.current.style.borderBottom = "#3A6C7B solid 0.2rem";
    NormalConsultHeaderRef.current.style.color = "#3A6C7B";
    NormalConsultListRef.current.style.display="block";

    RequestConsultHeaderRef.current.style.borderBottom = "#b1b1b1 solid 0.2rem";
    RequestConsultHeaderRef.current.style.color = "#b1b1b1";
    RequestConsultListRef.current.style.display="none";

    consultingHeaderRef.current.style.borderBottom = "#b1b1b1 solid 0.2rem";
    consultingHeaderRef.current.style.color = "#b1b1b1";
    consultingListRef.current.style.display="none";

    SetLoadingNormalConsult(true);
  };

  const onClickRequestHeaderBtn = () => {
    NormalConsultHeaderRef.current.style.borderBottom = "#b1b1b1 solid 0.2rem";
    NormalConsultHeaderRef.current.style.color = "#b1b1b1";
    NormalConsultListRef.current.style.display="none";

    RequestConsultHeaderRef.current.style.borderBottom = "#3A6C7B solid 0.2rem";
    RequestConsultHeaderRef.current.style.color = "#3A6C7B";
    RequestConsultListRef.current.style.display="block";

    consultingHeaderRef.current.style.borderBottom = "#b1b1b1 solid 0.2rem";
    consultingHeaderRef.current.style.color = "#b1b1b1";
    consultingListRef.current.style.display="none";

    SetLoadingRequestConsult(true);
  };

  const onClickConsultingBtn = () =>{
    NormalConsultHeaderRef.current.style.borderBottom = "#b1b1b1 solid 0.2rem";
    NormalConsultHeaderRef.current.style.color = "#b1b1b1";
    NormalConsultListRef.current.style.display="none";

    RequestConsultHeaderRef.current.style.borderBottom = "#b1b1b1 solid 0.2rem";
    RequestConsultHeaderRef.current.style.color = "#b1b1b1";
    RequestConsultListRef.current.style.display="none";

    consultingHeaderRef.current.style.borderBottom = "#3A6C7B solid 0.2rem";
    consultingHeaderRef.current.style.color = "#3A6C7B";
    consultingListRef.current.style.display="block";

    SetLoadingConsulting(true);
  }
  return (
    <div>
      <div style={{ display: "flex",width:"95%",margin: "0 auto" }}>
        <HeaderBtn ref={NormalConsultHeaderRef} onClick={onClickNormalConsultListBtn}>
          일반 피드백
        </HeaderBtn>
        <HeaderBtn
          ref={RequestConsultHeaderRef}
          onClick={onClickRequestHeaderBtn}
        >
          요청받은 피드백
        </HeaderBtn>
        <HeaderBtn ref={consultingHeaderRef} onClick={onClickConsultingBtn}>
          진행중인 피드백
        </HeaderBtn>
      </div>
			<div ref={NormalConsultListRef}>
      	<ConsultList SetLoading={SetLoadingNormalConsult} Loading={LoadingNormalConsult} consult = "NormalConsult"/>
			</div>
			<div ref={RequestConsultListRef}>
				<ConsultList SetLoading={SetLoadingRequestConsult} Loading={LoadingRequestConsult} consult = "RequestConsult" />
			</div>
      <div ref={consultingListRef}>
        <ConsultList SetLoading={SetLoadingConsulting} Loading={LoadingConsulting} consult = "consulting"/>
      </div>
    </div>
  );
};

const HeaderBtn = styled.span`
  width: 100%;
  height: 2.5rem;
  margin: 0 auto;
  display: flex;
  line-height: 2.5rem;
  justify-content: center;
  font-family: 'Noto Sans CJK KR';
  font-style: normal;
  font-weight: bold;
	font-size: 0.7rem;
`;

export default Header;
