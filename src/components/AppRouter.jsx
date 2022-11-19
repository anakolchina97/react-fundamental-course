import React, { useContext } from "react";
import { Route, Routes } from "react-router";
import { AuthContext } from "../context";
import Login from "../pages/Login";
import Posts from "../pages/Posts";
import { privateRoutes, publicRoutes } from "../router";
import Loader from "./ui/loader/Loader";

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          element={<route.component />}
          path={route.path}
          exact={route.exact}
          key={route.path}
        />
      ))}
      <Route element={<Posts replace to="/posts" />} path="/" />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          element={<route.component />}
          path={route.path}
          exact={route.exact}
          key={route.path}
        />
      ))}
      <Route element={<Login replace to="/login" />} path="/" />
    </Routes>
  );
};

export default AppRouter;
