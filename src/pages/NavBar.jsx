import { Badge } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUserData } from "../store/loginSlice";

const NavBar = ({ setcategory }) => {
  const { category, cartCount } = useSelector((state) => state?.loginSlice);
  const handleClick = (e) => {
    setcategory(e?.target?.innerText?.toLowerCase());
  };

  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <nav className="w-full h-10 flex items-center justify-end">
      <h3
        className="w-[15%] px-4 whitespace-nowrap text-black font-extrabold text-[20px]"
        onClick={() => Navigate("/")}
      >
        Fake Store
      </h3>
      <ul className="w-full list-none flex items-center justify-end">
        {location?.pathname != "/cart" && (
          <>
            {" "}
            {category?.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={handleClick}
                  className="w-[15%] px-4 whitespace-nowrap text-black font-bold text-[15px]"
                >
                  {item?.toUpperCase()}
                </li>
              );
            })}
          </>
        )}

        <li
          className="w-[15%] px-4 whitespace-nowrap text-black font-bold text-[15px]"
          onClick={() => Navigate("/cart")}
        >
          <Badge badgeContent={cartCount && cartCount} color="secondary">
            Cart
          </Badge>
        </li>
        <li
          className="w-[15%] px-4 whitespace-nowrap text-black font-bold text-[15px]"
          onClick={() => {
            Navigate("/");
            localStorage.clear();
            dispatch(setUserData(null));
          }}
        >
          Logout
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
