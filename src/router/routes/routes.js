import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import Main from "../../layouts/Main";
import Login from "../../Pages/Authentication/Login/Login";
import Registration from "../../Pages/Authentication/Registration/Registration";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../../Pages/Dashboard/MyProduct/MyProducts";

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
      {
        path: "/dashboard/add-product",
        element: <AddProduct />,
      },
      {
        path: "/dashboard/my-product",
        element: <MyProducts />,
      },
      {
        path: "/dashboard/all-sellers",
        element: <AllSellers />,
      },
      {
        path: "/dashboard/all-buyers",
        element: <AllBuyers />,
      },
    ],
  },
]);
