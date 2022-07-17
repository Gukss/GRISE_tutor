import React,{useState,useRef,useEffect} from 'react'
import axios from 'axios';
import styled from 'styled-components';
import ConsultItem from './ConsultItem';
import RequestConsultItem from './RequestConsultItem';

const ConsultList = (props) => {
  const [consultList,SetConsultList] = useState([]);
  const [touchPosition,setTouchPosition]= useState({x:0,y:0});
  const itemRef = useRef([]);
  const rejectList = useRef([]);
  const containerRef = useRef(null);
  const pageNumber = useRef(0);
  const noRefreshRef = useRef(null);

  function PushReject(idx){
    rejectList.current = [...rejectList.current,idx];
  }

  const GetConsult = () => {
    pageNumber.current=0;
    if(props.consult === 'NormalConsult'){
      /*
      axios({
        method:'GET',
        url:`https://grise.p-e.kr/tutor/consults/general`,
        headers: {
          Authorization: window.localStorage.getItem('token') ,
          "Content-Type": "application/json",
        },
        params:{
          offset:pageNumber.current*10,
          limit:10
        }
      })
      .then((res) => {
        SetConsultList(res.data);
      }).catch((error) => console.log(error));
      */


      //서버문제로 로컬로 진행
      const temp = window.localStorage.getItem("NormalConsult");
      if(temp === null || temp.length === 0){
        axios({
          method:'GET',
          url:`/Json/mainPageTutor/nomalConsultList.json`
        }).then((res) =>{
          const jsonToObject = JSON.parse(JSON.stringify(res.data));
          window.localStorage.setItem("NormalConsult",JSON.stringify(res.data));
          SetConsultList(jsonToObject);
        })
      }else{
        SetConsultList(JSON.parse(temp));
      }
    }else if(props.consult === 'RequestConsult'){
      /*
      axios({
        method:'GET',
        url:`https://grise.p-e.kr/tutor/consults/post`,
        headers: {
          Authorization: window.localStorage.getItem('token') ,
          "Content-Type": "application/json",
        },
        params:{
          offset:pageNumber.current*10,
          limit:10
        }
      })
      .then((res) => {
        SetConsultList(res.data);
      }).catch((error) => console.log(error));
      */

      //서버문제로 로컬로 진행
      const temp = window.localStorage.getItem("RequestConsult");
      if(temp === null || temp.length === 0){
        axios({
          method:'GET',
          url:`/Json/mainPageTutor/requestConsultList.json`
        }).then((res) =>{
          const jsonToObject = JSON.parse(JSON.stringify(res.data));
          window.localStorage.setItem("RequestConsult",JSON.stringify(res.data));
          SetConsultList(jsonToObject);
        })
      }else{
        SetConsultList(JSON.parse(temp));
      }
    }else if(props.consult === 'consulting'){
      /*
      axios({
        method:'GET',
        url:`https://grise.p-e.kr/tutor/consults/consulting`,
        headers: {
          Authorization: window.localStorage.getItem('token') ,
          "Content-Type": "application/json",
        },
        params:{
          offset:pageNumber.current*10,
          limit:10
        }
      })
      .then((res) => {
        SetConsultList(res.data);
      }).catch((error) => console.log(error));
      */

      //서버문제로 로컬로 진행
      const temp = window.localStorage.getItem("consulting");
      if(temp === null || temp.length === 0){
        axios({
          method:'GET',
          url:`/Json/mainPageTutor/consultingList.json`
        }).then((res) =>{
          const jsonToObject = JSON.parse(JSON.stringify(res.data));
          window.localStorage.setItem("consulting",JSON.stringify(res.data));
          SetConsultList(jsonToObject);
        })
      }else{
        SetConsultList(JSON.parse(temp));
      }
    }
  }

  const Refresh = () => {
    pageNumber.current+=1;
    noRefreshRef.current.style.display = 'block';
    console.log('새로고침',pageNumber.current);
    
    if(props.consult === 'NormalConsult'){
      axios({
        method:'GET',
        url:`https://grise.p-e.kr/tutor/consults/general`,
        headers: {
          Authorization: window.localStorage.getItem('token') ,
          "Content-Type": "application/json",
        },
        params:{
          offset:pageNumber.current*10,
          limit:10
        }
      })
      .then((res) => {
        const temp = [...consultList,...res.data];
        SetConsultList(temp);
        console.log(temp);
      }).catch((error) => {console.log(error);pageNumber.current-=1;noRefreshRef.current.style.display = 'none';});
      
    }else if(props.consult === 'RequestConsult'){
      axios({
        method:'GET',
        url:`https://grise.p-e.kr/tutor/consults/post`,
        headers: {
          Authorization: window.localStorage.getItem('token') ,
          "Content-Type": "application/json",
        },
        params:{
          offset:pageNumber.current*10,
          limit:10
        }
      })
      .then((res) => {
        const temp = [...consultList];
        rejectList.current.map(e=>itemRef.current[e].style.display='none');
        rejectList.current=[];
        SetConsultList([...temp,...res.data]);
      }).catch((error) => {console.log(error);pageNumber.current-=1;noRefreshRef.current.style.display = 'none';});
      
    }else if(props.consult === 'consulting'){
      axios({
        method:'GET',
        url:`https://grise.p-e.kr/tutor/consults/consulting`,
        headers: {
          Authorization: window.localStorage.getItem('token') ,
          "Content-Type": "application/json",
        },
        params:{
          offset:pageNumber.current*10,
          limit:10
        }
      })
      .then((res) => {
        const temp = [...consultList,...res.data];
        SetConsultList(temp);
        console.log(temp);
      }).catch((error) => {console.log(error);pageNumber.current-=1;noRefreshRef.current.style.display = 'none';});
      
    }
  }
  
  useEffect(() => {
    GetConsult();
  }, []);

  useEffect(()=>{noRefreshRef.current.style.display = 'none';},[consultList])

  useEffect(()=>{
    if(props.loading){
      GetConsult();
      props.SetLoading(false);
    }
  },[props])

  const TouchStart=(e)=>{
    setTouchPosition({ x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY });
  }

  const TouchEnd=(e)=>{
    if(consultList.length < 10){return;}
    const distanceY = touchPosition.y - e.changedTouches[0].pageY; //드래그한 Y길이 시작Y좌표 - 드래그끝났을때 Y좌표 내릴때 양수
    const DivHeight = itemRef.current[consultList.length-1].style.height; //아이템 하나의 높이
    const scrollY = containerRef.current.getBoundingClientRect().bottom-itemRef.current[consultList.length-1].getBoundingClientRect().bottom;
    //높이가 소수점이면 애매하게 딱 안맞을 수 있어서 수정
    if(-1<scrollY&&scrollY<1){
      if(distanceY>DivHeight){//스크롤링위치가 맨마지막에 되어있을때 item하나의 높이보다 더 드래그하면 새로고침
        //Refresh();
      }
    }
  }

  return (
    <div>
      <NoRefreshDiv ref = {noRefreshRef} />
      <ScrollDiv ref = {containerRef} onTouchStart={TouchStart} onTouchEnd={TouchEnd}>
        {
          consultList.map(function(el,idx){
            if(idx===consultList.length-1){
              if(props.consult === 'NormalConsult'){return <div key={idx} ref={(e)=>itemRef.current[idx]=e}><ConsultItem key = {idx} index = {idx} isEnd={true} consult = {props.consult} data = {el} /></div>;}
              else if(props.consult === 'RequestConsult'){return <div key={idx} ref={(e)=>itemRef.current[idx]=e}><RequestConsultItem key = {idx} isEnd={true} index = {idx} consult = {props.consult} PushReject = {PushReject} data = {el} /></div>;}
              else if(props.consult === 'consulting'){return <div key={idx} ref={(e)=>itemRef.current[idx]=e}><ConsultItem key = {idx} index = {idx} consult = {props.consult} isEnd={true} data = {el} /></div>;}
            }else{
              if(props.consult === 'NormalConsult'){return <div key={idx} ref={(e)=>itemRef.current[idx]=e}><ConsultItem key = {idx} index = {idx} isEnd={false} consult = {props.consult} data = {el} /></div>;}
              else if(props.consult === 'RequestConsult'){return <div key={idx} ref={(e)=>itemRef.current[idx]=e}><RequestConsultItem key = {idx} isEnd={false} index = {idx} consult = {props.consult} PushReject = {PushReject} data = {el} /></div>;}
              else if(props.consult === 'consulting'){return <div key={idx} ref={(e)=>itemRef.current[idx]=e}><ConsultItem key = {idx} index = {idx} isEnd={false} consult = {props.consult} data = {el} /></div>;}
            }
          })
        }
      </ScrollDiv>
    </div>
  )
}

const NoRefreshDiv = styled.div`
  margin-left: 2.5%;
  position: absolute;
  width: 95%;
  height: 30rem;
  display: none;
`

const ScrollDiv = styled.div`
  margin: 0 auto;
  width: 95%;
  height: 30rem;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-y:auto;
  ::-webkit-scrollbar {
    display: none;
  }
`

export default ConsultList;
