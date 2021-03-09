import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./routes/Home";
import { categoryLoading, getAllCategories } from "./redux/categorySlice";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductList from "routes/ProductList";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(categoryLoading("pending"));
    dispatch(getAllCategories());
    dispatch(categoryLoading("finished"));
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/testpage"
            component={(props: any) => {
              return <div>testpage</div>;
            }}
          />
          <Route path="/:slug" component={ProductList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
