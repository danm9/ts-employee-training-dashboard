import { Router, Route, route } from "preact-router";
import { h, Component } from "preact";
import axios from "axios";
import Parse from "parse";
import { authenticating } from "../parse/functions";

// Code-splitting is automated for routes
import { Sidebar, RouteIDs } from "./sidebar";
import { Grid } from "semantic-ui-react";
import MyDashboard from "../routes/MyDashboard";
import Library from "../routes/Library";
import CapabilityLevels from "../routes/CapabilityLevels";
import KnowledgeArea from "../routes/KnowledgeArea";
import CreateAccount from "../routes/CreateAccount";
import Login from "../routes/Login";
import Forgot from "../routes/Forgot";
import About from "../routes/About";
import PersonalLibrary from "../routes/PersonalLibrary";
import PrivateRoute from "../routes/PrivateRoute";
import Activities from "../routes/Activities";

Parse.initialize("your_app_id", "client_key");
Parse.serverURL = "http://localhost:1337/parse";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  state = { auth: sessionStorage.auth };
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <div id="sidebar-container">
          <Sidebar />
        </div>
        <div className={"AppContainer"}>
          <Router onChange={this.handleRoute}>
            <PrivateRoute
              path="/"
              component={MyDashboard}
              auth={this.state.auth}
            />
            <PrivateRoute
              path="/About"
              component={About}
              auth={this.state.auth}
            />
            <PrivateRoute
              path="/Library"
              component={Library}
              auth={this.state.auth}
            />
            <Route path="/createaccount" component={CreateAccount} />
            <Route path="/forgot" component={Forgot} />
            <PrivateRoute
              path="/:capabilityitem/:knowledgearea"
              auth={this.state.auth}
              component={KnowledgeArea}
            />
            <Route path="/login" component={Login} />
            <Route path="/forgot" component={Forgot} />
            <PrivateRoute
              path="/Activities"
              auth={this.state.auth}
              component={Activities}
            />
            <PrivateRoute
              path="/PersonalLibrary"
              component={PersonalLibrary}
              auth={this.state.auth}
            />
          </Router>
        </div>
      </div>
    );
  }
}
