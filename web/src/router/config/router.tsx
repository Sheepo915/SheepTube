import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import { Home } from "../../layout/Home";
import { Video } from "../Video";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/watch",
    element: <Video />,
  },
]);

export { router };
