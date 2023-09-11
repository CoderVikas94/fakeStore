import { BrowserRouter, useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import routes from "./routes";
function App() {
  const user = useSelector((state) => state?.loginSlice?.user);

  const routeLayout = useRoutes(routes(user));
  return <>{routeLayout}</>;
}

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;
