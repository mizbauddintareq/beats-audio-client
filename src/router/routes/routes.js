import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import Main from "../../layouts/Main";
import Login from "../../Pages/Authentication/Login/Login";
import Registration from "../../Pages/Authentication/Registration/Registration";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";

import Home from "../../Pages/Home/Home/Home";
import Products from "../../Pages/Products/Products";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "signup",
        element: <Registration />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "products/category/:name",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/products/category/${params.name}`),
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <MyOrders />,
      },
    ],
  },
]);
