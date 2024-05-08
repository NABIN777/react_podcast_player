/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeContext, themes } from "../api/Theme";
import Home from "../components/Pages/Home";
import Login from "../components/Pages/Login";
import Register from "../components/Pages/Register";
import "./App.css";
import "./App.scss";

const App = () => {
  const { language } = useSelector((state) => state.musicReducer);

  const dispatch = useDispatch();

  return (
    <ThemeContext.Provider value={themes.light}>
      <>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Home} />
            <Route path="/register" component={Register} />
          </Switch>
        </Router>
      </>
    </ThemeContext.Provider>
  );
};

export default App;
