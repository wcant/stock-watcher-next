import { matchRoutes, useLocation } from "react-router-dom";

export default function useCurrentPath(path) {
  const routes = [{ path: path }];
  const location = useLocation();
  const [{ route }] = matchRoutes(routes, location);

  return route.path;
}
