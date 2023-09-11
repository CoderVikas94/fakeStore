import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const myToken = JSON.parse(token || null);

console.log("myToken", myToken);

const loginSlice = createSlice({
  name: "user",
  initialState: {
    user: myToken,
    product: [],
    category: [],
    cart: [],
    cartCount: 0,
    cartTotal: 0,
  },
  reducers: {
    setUserData: (state, action) => {
      localStorage.setItem("token", JSON.stringify(action.payload));
      state.user = action.payload;
      console.log("state.user", state.user);
    },
    setProductData: (state, action) => {
      state.product = action.payload;
    },
    setCategorytData: (state, action) => {
      state.category = action.payload;
    },
    setCartData: (state, action) => {
      state.cart = action.payload;
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    setCartTotal: (state, action) => {
      state.cartTotal = action.payload;
    },
  },
});

export const {
  setUserData,
  setProductData,
  setCategorytData,
  setCartData,
  setCartCount,
  setCartTotal,
} = loginSlice.actions;

export default loginSlice.reducer;
