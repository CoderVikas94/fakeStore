import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { setCartCount, setCartData, setCartTotal } from "../store/loginSlice";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

export default function CartItem({ item }) {
  const [addCart, setaddCart] = React.useState(false);
  const [addCartCount, setaddCartCount] = React.useState(item?.count);
  const dispatch = useDispatch();
  const { cart, cartCount, cartTotal } = useSelector(
    (state) => state?.loginSlice
  );

  const location = useLocation();

  const handleCart = (data) => {
    if (addCartCount > 0) {
      const total = addCartCount + cartCount;
      setaddCart(!addCart);
      dispatch(setCartCount(total));
      dispatch(setCartData([...cart, { count: addCartCount, data }]));
    }
  };

  // React.useEffect(() => {
  //   if (!addCartCount) return;
  //   if (addCartCount > item?.count) {

  //     dispatch(setCartTotal(item?.count * item?.data?.price + cartTotal));
  //   } else {
  //     dispatch(setCartTotal(item?.count * item?.data?.price + cartTotal));

  //   }
  // }, [ addCartCount]);

  console.log("cartTotal", cartTotal);
  return (
    <div className="flex items-center">
      <img
        className="basis-[50%]"
        src={item?.data?.image}
        width={50}
        height={50}
      />
      <Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item?.data?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item?.data?.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Price : $ {item?.data?.price}</Button>
          <span className="flex items-center">
            <button
              className="w-3 outline-none border-none mx-2"
              onClick={() => {
                if (addCartCount > 0) {
                  setaddCartCount(addCartCount - 1);
                }
              }}
            >
              {" "}
              -{" "}
            </button>
            <input className="w-5" value={addCartCount} disabled />
            <button
              className="w-3 outline-none border-none mx-2"
              onClick={() => {
                if (addCartCount < 10) {
                  setaddCartCount(addCartCount + 1);
                }
              }}
            >
              {" "}
              +{" "}
            </button>
          </span>
          <Button
            size="small"
            className={`${
              addCart ? "bg-red-400" : "bg-slate-500"
            } whitespace-nowrap`}
            onClick={() => handleCart(item)}
          >
            {addCart || location?.pathname == "/cart"
              ? "Remove Cart"
              : "Add Cart"}
          </Button>
          <Button size="small">
            Total $ {(item?.data?.price * addCartCount)?.toFixed(2)}
          </Button>
        </CardActions>
      </Box>
    </div>
  );
}
