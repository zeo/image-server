import { Route } from "../index";
import Login from "../../../Pages/Auth/Login";
import LoginCallback from "../../../Pages/Auth/LoginCallback";

let routes: Route[] = [
  {
    paths: "/login",
    component: Login,
  },
  {
    paths: "/auth/token/:token",
    component: LoginCallback,
  },
];

export default routes;
