import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import GitHubUserFinder from "../pages/GitHubUserFinder";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <GitHubUserFinder />,
  },
  // {
  //   path: "/profile",
  //   element: <GitHouUserFinder />,
  // },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Route;
