import React, { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ProtectedRoute } from "./components/RouteProtection/ProtectedRoute";
import { ProtectedEntryRoute } from "./components/RouteProtection/ProtectedEntryRoute";

//import Home from "./components/home/Home";
//import EventScreen from "./components/events/EventScreen";
// import AddEvents from "./components/events/AddEvents";
// import EditEvents from "./components/events/EditEvents";
// import ViewEvents from "./components/events/viewEvents";
// import ListOfEvents from "./components/events/listOfEvents";
// import LoginScreen from "./components/login/LoginScreen";
// import SignUpScreen from "./components/signup/SignUpScreen";
// import AddScripts from "./components/scripts/AddScripts";
// import ListOfScripts from "./components/scripts/listOfScripts";
// import ScriptsScreen from "./components/scripts/ScriptsScreen";
// import EditScripts from "./components/scripts/EditScripts";
// import ViewScripts from "./components/scripts/viewScripts";
// import ContributeScripts from "./components/scripts/contributeScripts";
// import EditContributedScripts from "./components/scripts/EditContributedScripts";
// import ViewContributedScripts from "./components/scripts/ViewContributedScripts";
// import ItemDetail from "./components/scripts/scriptsSingle/scriptSingle";
// import About from "./components/About/about";
// import What from "./components/WhatWeDo/what"
// import Officebearers from "./components/OfficeBearers/officebearers";

const LoginScreen = React.lazy(() => {
  return import("./components/login/LoginScreen");
});
const SignUpScreen = React.lazy(() => {
  return import("./components/signup/SignUpScreen");
});
const AddEvents = React.lazy(() => {
  return import("./components/events/AddEvents");
});
const EditEvents = React.lazy(() => {
  return import("./components/events/EditEvents");
});
const ViewEvents = React.lazy(() => {
  return import("./components/events/viewEvents");
});
const ListOfEvents = React.lazy(() => {
  return import("./components/events/listOfEvents");
});
const AddScripts = React.lazy(() => {
  return import("./components/scripts/AddScripts");
});
const ListOfScripts = React.lazy(() => {
  return import("./components/scripts/listOfScripts");
});
const EventScreen = React.lazy(() => {
  return import("./components/events/EventScreen");
});
const ScriptsScreen = React.lazy(() => {
  return import("./components/scripts/ScriptsScreen");
});
const EditScripts = React.lazy(() => {
  return import("./components/scripts/EditScripts");
});
const ViewScripts = React.lazy(() => {
  return import("./components/scripts/viewScripts");
});
const ContributeScripts = React.lazy(() => {
  return import("./components/scripts/contributeScripts");
});
const EditContributedScripts = React.lazy(() => {
  return import("./components/scripts/EditContributedScripts");
});
const ViewContributedScripts = React.lazy(() => {
  return import("./components/scripts/ViewContributedScripts");
});
const ViewIndividualContributedScripts = React.lazy(() => {
  return import("./components/scripts/ViewIndividualContributedScripts");
});
const About = React.lazy(() => {
  return import("./components/About/about");
});
const What = React.lazy(() => {
  return import("./components/WhatWeDo/what");
});
const Officebearers = React.lazy(() => {
  return import("./components/OfficeBearers/officebearers");
});
const Home = React.lazy(() => {
  return import('./components/home/Home')
});
const ContributedScriptsScreen = React.lazy(() =>{
  return import("./components/scripts/ContributedScriptsScreen");
});
const ForgotPasswordScreen = React.lazy(()=>{
  return import('./components/forgotpassword/ForgotPasswordScreen');
})

function App() {
  return (
    <Router>
      <Suspense fallback={<div className={"center"}>Loading . . .</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/events-home" component={EventScreen} />
          <ProtectedEntryRoute exact path="/login" component={LoginScreen} />
          <ProtectedEntryRoute exact path="/forgotpassword" component={ForgotPasswordScreen} />
          <ProtectedRoute exact path="/signup" component={SignUpScreen} />
          <ProtectedRoute exact path="/add-event" component={AddEvents} />
          <ProtectedRoute exact path="/edit-event/:id" component={EditEvents} />
          <ProtectedRoute exact path="/add-script" component={AddScripts} />
          <ProtectedRoute exact path="/edit-script/:id" component={EditScripts}/>
          <Route exact path="/scripts" component={ScriptsScreen} />
          <Route exact path="/allScripts" component={ListOfScripts} />
          <Route exact path="/allEvents" component={ListOfEvents} />
          <Route exact path="/view-script/:id" component={ViewScripts} />
          <Route exact path="/view-event/:id" component={ViewEvents} />
          <Route exact path="/contribute-scripts" component={ContributeScripts}/>
          <Route exact path="/about" component={About} />
          <Route exact path="/what" component={What} />
          <Route exact path="/officebearers" component={Officebearers} />
          
          <ProtectedRoute exact path="/edit-contributed-scripts/:id" component={EditContributedScripts}/>
          <ProtectedRoute exact path="/view-individual-contributed-script/:id" component={ViewIndividualContributedScripts}/>
          <ProtectedRoute exact path="/view-contributed-scripts" component={ViewContributedScripts}/>
          <ProtectedRoute exact path="/contributed-scripts-home" component={ContributedScriptsScreen}/>
          <Route path="*">
            <div class="position-absolute top-50 start-50 translate-middle">
              <h2>404, Page not found</h2>
              <Link to="/">Back to Home Page</Link>
            </div>
          </Route>
        </Switch>
      </Suspense>
    </Router>
    // <div className="App">

    //  {/* <EventScreen/> */}
    // </div>
  );
}

export default App;
