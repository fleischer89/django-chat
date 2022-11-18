import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChatScreen from "./screens/home/ChatScreen";
import HomeScreen from "./screens/home/HomeScreen";
import LoginScreen from "./screens/auth/login/LoginScreen";
import SignupScreen from "./screens/auth/signup/SignupScreen";
import AppPaths from "./lib/appPaths";

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path={AppPaths.HOME} exact component={HomeScreen} />
          <Route path={AppPaths.CHAT_ROOM} exact component={HomeScreen} />
          <Route path={AppPaths.CHAT_ROOM_MOBILE} exact component={ChatScreen} />
          <Route path={AppPaths.LOGIN} exact component={LoginScreen} />
          <Route path={AppPaths.SIGN_UP} exact component={SignupScreen} />
        </Switch>
      </Router>
    );
  }
}
