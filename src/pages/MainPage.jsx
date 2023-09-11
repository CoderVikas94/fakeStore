import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategorytData, setProductData } from "../store/loginSlice";
import Item from "./Item";
import NavBar from "./NavBar";
import { Pagination } from "antd";

const MainPage = () => {
  const [category, setcategory] = useState("");
  const [limit, setLimit] = useState(5);
  const dispatch = useDispatch();

  const getData = async () => {
    if (category?.length > 0) {
      await axios
        .get(`https://fakestoreapi.com/products/category/${category}`)
        .then((res) => {
          dispatch(setProductData(res?.data));
        });
    } else {
      await axios
        .get(`https://fakestoreapi.com/products?limit=${limit}`)
        .then((res) => {
          dispatch(setProductData(res?.data));
        });
    }
  };
  const getcategory = async () => {
    await axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => {
        dispatch(setCategorytData(res?.data));
      });
  };

  useEffect(() => {
    getData();
  }, [category, limit]);

  useEffect(() => {
    getcategory();
  }, []);

  const handlePagination = (e) => {
    dispatch(setProductData([]));
    const limitPage = e * limit;
    setLimit(limitPage);
  };
  const product = useSelector((state) => state?.loginSlice?.product);
  const { cart } = useSelector((state) => state?.loginSlice);
  console.log("cart", cart);
  return (
    <div className="w-full">
      <NavBar setcategory={setcategory} />
      <div className="w-full flex flex-wrap mt-10">
        {product?.map((item, index) => {
          return (
            <div key={index} className="w-[20%] px-3 py-10">
              <Item item={item} key={index} />
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center items-center">
        <Pagination defaultCurrent={1} total={50} onChange={handlePagination} />
      </div>
    </div>
  );
};

export default MainPage;
