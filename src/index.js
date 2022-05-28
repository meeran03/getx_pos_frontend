import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { checkUser } from 'Services/User'

// core components
import Admin from "layouts/Admin.js";
import Admin2 from "layouts/Admin2.js";
import Login from './views/Auth/Login'

import "assets/css/material-dashboard-react.css?v=1.9.0";
import POSScreen from "views/Pos";

const hist = createBrowserHistory();



ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route
        render={props =>
          checkUser() != undefined ? (
            <>
              <Route path="/admin" component={Admin2} />
              <Route exact path="/pos" component={POSScreen} />
              <Redirect from="/" to={props.location} />
            </>
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />
      <Route path="/admin" component={Admin} />

    </Switch>
  </Router>,
  document.getElementById("root")
);
