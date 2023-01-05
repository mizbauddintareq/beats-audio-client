import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const Registration = () => {
  const { createUser, updateUsers } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        handleUpdateUsersInfo({ displayName: data.name });

        const usersInfo = {
          name: data.name,
          email: data.email,
          role: data.role,
        };
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(usersInfo),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        console.error(errorCode);
      });
  };

  const handleUpdateUsersInfo = (info) => {
    updateUsers(info)
      .then(() => {})
      .catch((error) => {});
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:w-4/12 mx-auto bg-slate-400 p-6"
      >
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="Your Full Name"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter Your Email"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            {...register("password")}
            type="Password"
            placeholder="Type Your Password"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">User Role</span>
          </label>
          <select
            className="select select-bordered w-full"
            {...register("role")}
          >
            <option value="buyer" selected>
              Buyer
            </option>
            <option value="user">User</option>
            <option value="seller">Seller</option>
          </select>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text-alt">
              Already have an account? please <Link to="/login">login</Link>{" "}
            </span>
          </label>
        </div>
        <div className="form-control w-full my-2">
          <button className="btn btn-primary" type="submit">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
