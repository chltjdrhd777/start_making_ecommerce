import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./routes/Homepage/Home";
import Login from "./routes/LogIn/Login";
import Register from "./routes/Register/Register";
import { login } from "./redux/userSlice";
import { useDispatch } from "react-redux";

function App() {
  const token = localStorage.getItem("token");
  const adminInfo = localStorage.getItem("adminInfo");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && adminInfo) {
      dispatch(
        login({
          token,
          ...JSON.parse(adminInfo!),
        })
      );
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
