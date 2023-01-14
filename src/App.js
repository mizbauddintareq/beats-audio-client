import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes/routes";

function App() {
  return (
    <div className="">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
