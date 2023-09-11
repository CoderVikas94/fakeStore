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

export default function Item({ item }) {
  const [addCart, setaddCart] = React.useState(false);
  const [addCartCount, setaddCartCount] = React.useState(0);
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
      dispatch(setCartTotal(cartTotal + total * item?.price));
      dispatch(setCartData([...cart, { count: addCartCount, data }]));
    }
  };

  function clipDescription(description, maxCharacters) {
    if (description.length <= maxCharacters) {
      return description;
    }

    return description.slice(0, maxCharacters) + "...";
  }

  const clippeddes = clipDescription(item?.description, 100);
  const clippedTitle = clipDescription(item?.title, 16);

  return (
    <Card sx={{ width: "200px" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="50"
        width={"50"}
        image={item?.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {clippedTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {clippeddes}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">$ {item?.price}</Button>
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
          <input className="w-3" value={addCartCount} disabled />
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
      </CardActions>
    </Card>
  );
}
