import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import CartItem from "./CartItem";

const Cart = () => {
  const { cart, cartTotal } = useSelector((state) => state?.loginSlice);

  return (
    <div className="w-full">
      <NavBar cart={cart} />
      <div className="w-full flex items-center">
        <div className="w-full flex flex-col mt-10">
          {cart?.length > 0 ? (
            cart?.map((item, index) => {
              return (
                <div key={index} className="w-[80%] h-[10%] px-3 py-10">
                  <CartItem item={item} key={index} />
                </div>
              );
            })
          ) : (
            <div className="w-full h-[500px] flex justify-center items-center">
              <h2 className="font-semibold">Your Cart is Empty. </h2>
            </div>
          )}
          <div className="w-full flex justify-center items-center my-6">
            <button className="w-[200px] h-14 font-bold">
              Grand Total - $ {cartTotal?.toFixed(2)}
            </button>
          </div>
          <div className="w-full flex justify-center items-center my-6">
            <button className="w-[200px] h-14 rounded-md text-white bg-black">
              Procced to Payment
            </button>
          </div>
        </div>

        {/* <div className="w-[20%] flex justify-center items-center">
          <div>
            <h2 className="font-bold">Total Items ={cart?.length}</h2>

            {cart?.length > 0 &&
              cart?.map((item, index) => {
                return (
                  <li className="list-none flex items-center">
                    <span>1 *{item.price}</span>
                    <span>={item.price}</span>
                  </li>
                );
              })}
            <h2 className="font-bold">Total ={total}</h2>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Cart;
