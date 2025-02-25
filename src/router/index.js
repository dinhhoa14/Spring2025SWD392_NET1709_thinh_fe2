const routes = {
  home: "/",
  notFound: "/not-found",
  registerVaccination: "/register-for-vaccination",
  aboutUs: "/About-us",
  blog: "/blog",
  blogDetail: "/blog/detail/:id",
  vaccinationGuide: "/vaccination-guide",
  service: "/services",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
  },
  user: {
    profile: "/user/profile",
    registerProfileChild: "/user/register-profile-child",
  },
  admin: {
    dashboard: "/admin/dashboard",
    adminVaccine: "/admin/vaccine"
  },
  staff: {
    blog: "/staff/blog",
  },
};

export default routes;
