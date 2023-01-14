import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { errorAlert } from "../../../utilities/errorAlert";
import { successAlert } from "../../../utilities/successAlert";

const Registration = () => {
  const { createUser, updateUserProfile, googleLogin } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((userCredential) => {
        // const user = userCredential.user;
        const userProfile = {
          displayName: data.name,
        };
        handleUpdateUser(userProfile);

        const userInfo = {
          name: data.name,
          email: data.email,
          role: data.role,
        };
        savedUser(userInfo);

        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        errorAlert(errorCode);
      });
  };

  // const update user name
  const handleUpdateUser = (info) => {
    updateUserProfile(info)
      .then(() => {})
      .catch((error) => {});
  };

  const savedUser = (userInfo) => {
    fetch("https://beats-audio-server.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        successAlert("Registration Successful");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;

        const userInfo = {
          name: user.displayName,
          email: user.email,
          role: "buyer",
        };
        savedUser(userInfo);
        navigate(from, { replace: true });
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
          <h3 className="text-xl text-center font-bold">Sign Up</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text dark:text-white">Name</span>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="input dark:bg-accent dark:text-white dark:border-white w-full input-bordered"
                {...register("name", { required: "name is required" })}
              />
              {errors.name && (
                <p className="text-error">{errors.name?.message}</p>
              )}
            </div>
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

            <div className="form-control w-full my-4">
              <label className="label">
                <span className="label-text">Select Role</span>
              </label>
              <select {...register("role")} className="select select-bordered">
                <option value="buyer">User/Buyer</option>
                <option value="seller">Seller</option>
              </select>
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
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 Characters",
                  },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    message:
                      "password must be 1 uppercase 1 lowercase & 1 special character",
                  },
                })}
              />
              {errors.password && (
                <p className="text-error">{errors.password?.message}</p>
              )}
            </div>
            <div className="form-control w-full my-4">
              <input
                type="submit"
                value="Sign Up"
                className="btn btn-accent dark:bg-slate-900 w-full input-bordered"
              />
            </div>
          </form>
          <div>
            <p className="text-center">
              Already have an account please?{" "}
              <Link className="text-secondary" to="/login">
                login
              </Link>{" "}
            </p>
            <div className="divider">OR</div>
            <button onClick={handleGoogleLogin}>Google login</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
