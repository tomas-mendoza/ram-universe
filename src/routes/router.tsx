import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import CharacterInfo from "../pages/CharacterInfo";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/:id',
    element: <CharacterInfo />
  }
]);

export default routes;