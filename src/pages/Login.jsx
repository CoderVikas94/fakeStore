import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/loginSlice";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  // const Navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("https://fakestoreapi.com/auth/login", user)
      .then((res) => {
        console.log("res", res);
        dispatch(setUserData(res?.data));
        setUser({
          username: "",
          password: "",
        });
        // Navigate("/");
      });
  };
  //  mor_2314
  // 83r5^_
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <form
        className="w-[250px] h-[400px] flex flex-col my-10"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={user?.username}
          className="w-full mx-2 my-2 border-[1px] border-blue-400 h-8 rounded-md"
          placeholder="User Name"
          onChange={(e) => {
            setUser({ ...user, username: e?.target?.value });
          }}
        />
        <input
          type="password"
          className="w-full mx-2 my-2  border-[1px] border-blue-400 h-8 rounded-md"
          placeholder="Password"
          value={user?.password}
          onChange={(e) => {
            setUser({ ...user, password: e?.target?.value });
          }}
        />
        <button
          type="submit"
          className="bg-black rounded-md w-full mx-2 my-2 text-white"
        >
          {" "}
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
