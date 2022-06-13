import { BrowserRouter, Route, Routes } from "react-router-dom";
import React,{useEffect} from 'react';
import routes from "./routes";

function App() {
  useEffect(()=>{
    const loginURL = `${window.location.origin}/tuteeLogin`;
    const redirectURL = `${window.location.origin}/RedirectTutee`
    const currentURL = window.location.href;
    if(currentURL === loginURL || currentURL.includes(redirectURL)){return;}
    if(window.localStorage.getItem('token')===''){
      window.location.href=loginURL;
      alert('비정상적인 접근입니다. 로그인해주세요!');
    }
  },[])
  return (
    <BrowserRouter>
      <Routes>
				{routes.map(route => {
					return (
						<Route key={route.path} exact path={route.path} element={<route.component />} />
					)
				})}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
