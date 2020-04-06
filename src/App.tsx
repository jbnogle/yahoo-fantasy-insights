import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Team from "./components/Team";
import Home from "./components/Home";

export default function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/team">
          <Team />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
