import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes/routes";

function App() {
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
