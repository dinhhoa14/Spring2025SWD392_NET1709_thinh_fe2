import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "@pages/HomePage";
import LayoutMain from "@layouts/LayoutMain";
import LayoutAuth from "@layouts/LayoutAuth";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegitserPage/index.jsx";
import routes from "./index.js";
const RegisterVaccinationPage = lazy(() => import('@pages/RegisterVaccinationPage/index.jsx'))
import VaccinationGuidePage from "@pages/VaccinationGuide";
import Counter from "@components/test/Counter";
import AboutUsPage from "@pages/AboustUsPage/index.jsx";
import LayoutAdmin from "@layouts/LayoutAdmin.jsx";
import DashBoardPage from "@pages/adminPage/DashboardPage/index.jsx";
import LayoutCus from "@layouts/LayoutCus.jsx";
import UserProfile from "@containers/customer/ProfileCus/index.jsx";
import RegisterProfileChildPage from "@pages/RegisterProfileChildPage/index.jsx";
import BlogPage from "@pages/BlogPage/index.jsx";
import ProtectedRoute from "@containers/auth/ProtectedRoute/index.jsx";
import NotFound from "@containers/NotFound/index.jsx";
import LayoutStaff from "@layouts/LayoutStaff.jsx";
import Blogs from "@containers/staff/Blog/index.jsx";
import BlogDetail from "@containers/BlogDetail/index.jsx";


const user = localStorage.getItem("userDataNhanAi");
const userRole = JSON.parse(user || '{}').role || 'GUEST';
const Router = createBrowserRouter(
  [
    {
      path: routes.home,
      element: <LayoutMain />,
      children: [
        { path: routes.home, element: <HomePage /> },
        { path: routes.notFound, element: <NotFound /> },
        {
          path: routes.registerVaccination,
          element: <RegisterVaccinationPage />,
        },
        { path: routes.vaccinationGuide, element: <VaccinationGuidePage /> },
        { path: routes.service, element: <Counter /> },
        { path: routes.aboutUs, element: <AboutUsPage /> },
        { path: routes.blog, element: <BlogPage /> },
        { path: routes.blogDetail, element: <BlogDetail /> },
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
      element: <ProtectedRoute role={userRole} allowedRoles={['CUSTOMER']} ><LayoutCus /></ProtectedRoute>,
      children: [
        { path: routes.user.profile.split("/")[2], element: <UserProfile /> },
        { path: routes.user.registerProfileChild.split("/")[2], element: <RegisterProfileChildPage /> }
      ],

    },
    {
      path: routes.admin.dashboard,
      element: <ProtectedRoute role={userRole} allowedRoles={['ADMIN', 'MANAGER']} ><LayoutAdmin /></ProtectedRoute>,
      children: [{ path: routes.admin.dashboard, element: <DashBoardPage /> }],
    },
    {
      path: routes.staff.blog.split("/")[1],
      element: <ProtectedRoute role={userRole} allowedRoles={['STAFF']} ><LayoutStaff /></ProtectedRoute>,
      children: [{ path: routes.staff.blog.split("/")[2], element: <Blogs /> }],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);
export default Router;