import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@src/stores/slices/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from "@src/router/index.js";
// import { fetchUser } from "@src/stores/slices/authSlice.js";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then((data) => {
        toast.success("🎉 Đăng nhập thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        //console.log(data.role === "STAFF")
        if (data.role === "ADMIN" || data.role === "MANAGER") {
          window.location.replace(routes.admin.dashboard);
        } else if (data.role === "STAFF") {
          window.location.replace(routes.staff.blog);
        } else {
          window.location.replace(routes.home);
        }

      })
      .catch((err) => {
        toast.error(`❌ ${err || "Đăng nhập thất bại!"}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="basis-1/2 hidden md:flex justify-center items-center mr-3">
        <img src="https://i.pinimg.com/736x/d7/9d/40/d79d40d0a75430f94380cd2fdb4b57a5.jpg" alt="thumbnail" />
      </div>

      <div className="w-full max-w-md bg-white flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Đăng nhập</h1>
        {error && <p className="text-red-500 text-center">{error?.message || "An unexpected error occurred"}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative flex items-center border-b-2">
            <input {...register("email", { required: "Email is required" })} type="email" placeholder="Email" className="w-full p-3 focus:outline-none" />
          </div>
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

          <div className="relative flex items-center border-b-2">
            <input {...register("password", { required: "Password is required" })} type="password" placeholder="Mật khẩu" className="w-full p-3 focus:outline-none" />
          </div>
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition cursor-pointer" disabled={status === "loading"}>
            {status === "Chờ..." ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Bạn chưa có tài khoản? <Link to={routes.auth.register} className="text-blue-500">Đăng ký</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
