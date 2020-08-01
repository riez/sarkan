import route from "next-routes";
import { isSSR } from "./utils";

interface RouteType {
  name: string;
  page: string;
  pattern: string;
}

export const routes: RouteType[] = [
  { name: "home", page: "index", pattern: "/" },
  { name: "admin", page: "Admin", pattern: "/admin" },
  { name: "add", page: "Add", pattern: "/admin/new-data" },
  { name: "list", page: "List", pattern: "/list" },
];

const nextRoutes = new route();
routes.forEach((item: RouteType) => {
  return nextRoutes.add(item);
});

export const Link = nextRoutes.Link;
export const Router = nextRoutes.Router;
export const getRouter = (): typeof Router => {
  if (!isSSR) {
    return Router;
  }
  return null;
};

export default nextRoutes;
