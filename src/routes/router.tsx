import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import CharacterInfo from "../pages/CharacterInfo";
import EpisodeInfo from "../pages/EpisodeInfo";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/character/:id',
    element: <CharacterInfo />
  },
  {
    path: '/episode/:id',
    element: <EpisodeInfo />
  }
]);

export default routes;
