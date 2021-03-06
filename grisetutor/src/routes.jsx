import TutorMainPage from "./Pages/TutorMainPage/TutorMain";
import TutorConsultBoard from "./Pages/TutorConsultPage/Board";
import TutorLoginPage from "./Pages/LoginPage/TutorLoginPage";
import RedirectTutorPage from './oauth/RedirectTutor';
import ProfilePage from './Pages/ProfilePage/ProfilePage'
import LoadingPage from "./Pages/LoadingPage";
const routes = [
  {
    path: "/",
    component: TutorLoginPage,
  },
  {
    path: "/tutorMain",
    component: TutorMainPage,
  },
  {
    path: "/tutorLogin",
    component: TutorLoginPage,
  },
  {
    path: "/tutorConsult",
    component: TutorConsultBoard,
  },
  {
    path: "/RedirectTutor",
    component: RedirectTutorPage,
  },
  {
    path: "/profile",
    component: ProfilePage,
  },
  {
    path: "/test",
    component: LoadingPage,
  },
];

export default routes;
