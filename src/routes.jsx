import React from "react";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Cart from "./pages/Cart";
import { Navigate, Outlet } from "react-router-dom";
const routes = (user) => {
  const MainLayout = () => {
    return (
      <>
        <Outlet />
      </>
    );
  };

  return [
    {
      path: "/",
      element: user ? <MainLayout /> : <Navigate to={"/login"} />,
      children: [
        {
          index: true,
          element: <MainPage />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
    { path: "/login", element: !user ? <Login /> : <Navigate to={"/"} /> },
  ];
};
export default routes;
