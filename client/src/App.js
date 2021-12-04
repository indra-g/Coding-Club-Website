import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import "./css/eventScreen.css";
import EventScreen from "./components/events/EventScreen";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AddEvents from "./components/events/AddEvents";
import EditEvents from "./components/events/EditEvents";
import ViewEvents from "./components/events/viewEvents";
import ListOfEvents from "./components/events/listOfEvents";

import LoginScreen from "./components/login/LoginScreen";
import SignUpScreen from "./components/signup/SignUpScreen";

import AddScripts from "./components/scripts/AddScripts";
import ListOfScripts from "./components/scripts/listOfScripts";
import ScriptsScreen from "./components/scripts/ScriptsScreen";
import EditScripts from "./components/scripts/EditScripts";
import ViewScripts from "./components/scripts/viewScripts";
import ContributeScripts from "./components/scripts/contributeScripts";
import EditContributedScripts from "./components/scripts/EditContributedScripts";
import ViewContributedScripts from "./components/scripts/ViewContributedScripts";
import ItemDetail from "./components/scripts/scriptsSingle/scriptSingle";
import About from "./components/About/about";
import What from "./components/WhatWeDo/what"
import Officebearers from "./components/OfficeBearers/officebearers";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={EventScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/signup" component={SignUpScreen} />
        <Route exact path="/add-event" component={AddEvents} />
        <Route exact path="/edit-event/:id" component={EditEvents} />
        <Route exact path="/add-script" component={AddScripts} />
        <Route exact path="/edit-script/:id" component={EditScripts} />
        <Route exact path="/scripts" component={ScriptsScreen} />
        <Route exact path="/allScripts" component={ListOfScripts} />
        <Route exact path="/allEvents" component={ListOfEvents} />
        <Route exact path="/view-script/:id" component={ViewScripts} />
        <Route exact path="/view-event/:id" component={ViewEvents} />
        <Route exact path="/contribute-scripts" component={ContributeScripts} />
        <Route exact path="/about" component={About} />
        <Route exact path="/what" component={What} />
        <Route exact path="/officebearers" component={Officebearers} />
        <Route
          exact
          path="/edit-contributed-scripts/:id"
          component={EditContributedScripts}
        />
        <Route
          exact
          path="/view-contributed-scripts"
          component={ViewContributedScripts}
        />

        <Route path="*">
          <div class="position-absolute top-50 start-50 translate-middle">
            <h2>404, Page not found</h2>
            <Link to="/">Back to Home Page</Link>
          </div>
        </Route>
      </Switch>
    </Router>
    // <div className="App">

    //  {/* <EventScreen/> */}
    // </div>
  );
}

export default App;
