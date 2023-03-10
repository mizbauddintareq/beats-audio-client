import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthProvider";

import { errorAlert } from "../../../utilities/errorAlert";
import { successAlert } from "../../../utilities/successAlert";

const Login = () => {
  const { loginUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    loginUser(data.email, data.password)
      .then((userCredential) => {
        successAlert("Login Successful");
        navigate(from, { replace: true });
        reset();
      })
      .catch((error) => {
        const errorCode = error.code;
        errorAlert(errorCode);
      });
  };
  return (
    <section className="my-16">
      <div className="lg:w-4/12 w-full mx-auto dark:bg-accent">
        <div className="shadow-xl rounded-xl p-6">
          <h3 className="text-xl text-center font-bold">Login</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text dark:text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email Address"
                className="input dark:bg-accent dark:text-white dark:border-white w-full input-bordered"
                {...register("email", { required: "email is required" })}
              />
              {errors.email && (
                <p className="text-error">{errors.email?.message}</p>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text dark:text-white">Password</span>
              </label>
              <input
                type="password"
                placeholder="Type password"
                className="input w-full dark:bg-accent dark:text-white dark:border-white input-bordered"
                {...register("password", {
                  required: "password is required",
                })}
              />
              {errors.password && (
                <p className="text-error">{errors.password?.message}</p>
              )}
              <small>
                <label htmlFor="forgot-pass" className="cursor-pointer">
                  Forgot password?
                </label>
              </small>
            </div>
            <div className="form-control w-full my-4">
              <input
                type="submit"
                value="login"
                className="btn btn-accent dark:bg-slate-900 w-full input-bordered"
              />
            </div>
          </form>
          <div>
            <p className="text-center">
              New to beatsAudio?{" "}
              <Link className="text-secondary" to="/signup">
                create an account
              </Link>{" "}
            </p>
            <div className="divider">OR</div>
            <h1>Google login</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
