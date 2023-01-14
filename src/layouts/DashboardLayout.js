import { useContext, useEffect, useState } from "react";
import { json, Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/users/role?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserRole(data);
        console.log(data);
      });
  }, [user?.email]);

  return (
    <div>
      <>
        <Navbar />
        <div className="drawer drawer-mobile">
          <input
            id="dashboard-drawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content ">
            <Outlet />
          </div>
          <div className="drawer-side">
            <label
              htmlFor="dashboard-drawer"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 bg-base-100 text-base-content">
              {userRole?.role === "buyer" && (
                <li>
                  <Link to="/dashboard">My Orders</Link>
                </li>
              )}

              {userRole?.role === "seller" && (
                <>
                  <li>
                    <Link to="/dashboard/add-product">Add A Product</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/my-product">My Product</Link>
                  </li>
                </>
              )}

              {userRole?.role === "admin" && (
                <>
                  <li>
                    <Link>All Seller</Link>
                  </li>
                  <li>
                    <Link>All Buyer</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </>
    </div>
  );
};

export default DashboardLayout;
