import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main";
import Home from "../../Pages/Home/Home/Home";
import Products from "../../Pages/Products/Products";

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
        path: "products/category/:name",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/products/category/${params.name}`),
        element: <Products />,
      },
    ],
  },
]);
