import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./routes/Homepage/Home";
import Login from "./routes/LogIn/Login";
import Register from "./routes/Register/Register";

function App() {
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
