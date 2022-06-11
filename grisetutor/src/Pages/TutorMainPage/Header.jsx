import React, { useRef, useEffect,useState } from "react";
import styled from 'styled-components';
import ConsultList from './List/ConsultList';


const Header = () => {
  const normalConsultHeaderRef = useRef(null);
  const requestConsultHeaderRef = useRef(null);
  const normalConsultListRef = useRef(null);
  const [loadingNormalConsult,SetLoadingNormalConsult] = useState(false);
  const requestConsultListRef = useRef(null);
  const [loadingRequestConsult,SetLoadingRequestConsult] = useState(false);
  const consultingHeaderRef = useRef(null);
  const consultingListRef = useRef(null);
  const [loadingConsulting,SetLoadingConsulting] = useState(false);
  useEffect(() => {
    ShowNormalConsultList();
  }, []);

  const ShowNormalConsultList = () => {
    normalConsultHeaderRef.current.style.borderBottom = "#3A6C7B solid 0.2rem";
    normalConsultHeaderRef.current.style.color = "#3A6C7B";
    normalConsultListRef.current.style.display="block";

    requestConsultHeaderRef.current.style.borderBottom = "#b1b1b1 solid 0.2rem";
    requestConsultHeaderRef.current.style.color = "#b1b1b1";
    requestConsultListRef.current.style.display="none";

    consultingHeaderRef.current.style.borderBottom = "#b1b1b1 solid 0.2rem";
    consultingHeaderRef.current.style.color = "#b1b1b1";
    consultingListRef.current.style.display="none";

    SetLoadingNormalConsult(true);
  };

  const ShowRequestConsultList = () => {
    normalConsultHeaderRef.current.style.borderBottom = "#b1b1b1 solid 0.2rem";
    normalConsultHeaderRef.current.style.color = "#b1b1b1";
    normalConsultListRef.current.style.display="none";

    requestConsultHeaderRef.current.style.borderBottom = "#3A6C7B solid 0.2rem";
    requestConsultHeaderRef.current.style.color = "#3A6C7B";
    requestConsultListRef.current.style.display="block";

    consultingHeaderRef.current.style.borderBottom = "#b1b1b1 solid 0.2rem";
    consultingHeaderRef.current.style.color = "#b1b1b1";
    consultingListRef.current.style.display="none";

    SetLoadingRequestConsult(true);
  };

  const ShowConsultingList = () =>{
    normalConsultHeaderRef.current.style.borderBottom = "#b1b1b1 solid 0.2rem";
    normalConsultHeaderRef.current.style.color = "#b1b1b1";
    normalConsultListRef.current.style.display="none";

    requestConsultHeaderRef.current.style.borderBottom = "#b1b1b1 solid 0.2rem";
    requestConsultHeaderRef.current.style.color = "#b1b1b1";
    requestConsultListRef.current.style.display="none";

    consultingHeaderRef.current.style.borderBottom = "#3A6C7B solid 0.2rem";
    consultingHeaderRef.current.style.color = "#3A6C7B";
    consultingListRef.current.style.display="block";

    SetLoadingConsulting(true);
  }
  return (
    <div>
      <div style={{ display: "flex",width:"95%",margin: "0 auto" }}>
        <HeaderBtn ref={normalConsultHeaderRef} onClick={ShowNormalConsultList}>
          일반 피드백
        </HeaderBtn>
        <HeaderBtn
          ref={requestConsultHeaderRef}
          onClick={ShowRequestConsultList}
        >
          요청받은 피드백
        </HeaderBtn>
        <HeaderBtn ref={consultingHeaderRef} onClick={ShowConsultingList}>
          진행중인 피드백
        </HeaderBtn>
      </div>
			<div ref={normalConsultListRef}>
      	<ConsultList SetLoading={SetLoadingNormalConsult} loading={loadingNormalConsult} consult = "NormalConsult"/>
			</div>
			<div ref={requestConsultListRef}>
				<ConsultList SetLoading={SetLoadingRequestConsult} loading={loadingRequestConsult} consult = "RequestConsult" />
			</div>
      <div ref={consultingListRef}>
        <ConsultList SetLoading={SetLoadingConsulting} loading={loadingConsulting} consult = "consulting"/>
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
