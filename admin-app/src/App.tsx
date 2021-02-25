import React, { useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Home from "./routes/Homepage/Home";
import Login from "./routes/LogIn/Login";
import Register from "./routes/Register/Register";
import { login } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Products from "./routes/products/Products";
import Orders from "./routes/orders/Orders";
import Category from "./routes/Category/Category";
import { categoryLoading, getAllCategories } from "./redux/categorySlice";
import { getAllProducts } from "./redux/productSlice";
import { selectUser } from "./redux/mainReducer";

function App() {
  const token = localStorage.getItem("token");
  const localUserInfo = localStorage.getItem("userInfo");
  const dispatch = useDispatch();

  const { userInfo } = useSelector(selectUser);
  useEffect(() => {
    if (token && localUserInfo) {
      dispatch(
        login({
          token,
          ...JSON.parse(localUserInfo!),
        })
      );
    }
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.role === "admin") {
      dispatch(categoryLoading("pending"));
      dispatch(getAllCategories());
      dispatch(getAllProducts());
      dispatch(categoryLoading("finished"));
    }
  }, [userInfo]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/products" component={Products} />
          <Route path="/category" component={Category} />
          <Route path="/orders" component={Orders} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
