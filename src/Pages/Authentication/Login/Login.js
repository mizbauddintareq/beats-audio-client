import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";

const Login = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>This is login</h1>
    </div>
  );
};

export default Login;
