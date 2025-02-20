import { createBrowserRouter } from "react-router-dom";
import HomePage from "@pages/HomePage";
import LayoutMain from "@layouts/LayoutMain";
import LayoutAuth from "@layouts/LayoutAuth";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegitserPage/index.jsx";
import routes from "./index.js";
import RegisterVaccinationPage from "../page/RegisterVaccinationPage";
import VaccinationGuidePage from "@pages/VaccinationGuide";
import Counter from "@components/test/Counter";
import AboutUsPage from "@pages/AboustUsPage/index.jsx";
import LayoutAdmin from "@layouts/LayoutAdmin.jsx";
import DashBoardPage from "@pages/adminPage/DashboardPage/index.jsx";
import LayoutCus from "@layouts/LayoutCus.jsx";
import UserProfile from "@containers/customer/ProfileCus/index.jsx";
import RegisterProfileChildPage from "@pages/RegisterProfileChildPage/index.jsx";
import BlogPage from "@pages/BlogPage/index.jsx";

const Router = createBrowserRouter(
  [
    {
      path: routes.home,
      element: <LayoutMain />,
      children: [
        { path: routes.home, element: <HomePage /> },
        {
          path: routes.registerVaccination,
          element: <RegisterVaccinationPage />,
        },
        { path: routes.vaccinationGuide, element: <VaccinationGuidePage /> },
        { path: routes.service, element: <Counter /> },
        { path: routes.aboutUs, element: <AboutUsPage /> },
        { path: routes.blog, element: <BlogPage /> },
      ],
    },
    {
      path: routes.auth.login.split("/")[1],
      element: <LayoutAuth />,
      children: [
        { path: routes.auth.login.split("/")[2], element: <LoginPage /> }, // Lấy "login" từ "/auth/login"
        { path: routes.auth.register.split("/")[2], element: <RegisterPage /> }, // Lấy "register" từ "/auth/register"
      ],
    },
    {
      path: routes.user.profile.split("/")[1],
      element: <LayoutCus />,
      children: [
        { path: routes.user.profile.split("/")[2], element: <UserProfile /> },
        { path: routes.user.registerProfileChild.split("/")[2], element: <RegisterProfileChildPage /> }
      ],

    },
    {
      path: routes.admin.dashboard,
      element: <LayoutAdmin />,
      children: [{ path: routes.admin.dashboard, element: <DashBoardPage /> }],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);
export default Router;