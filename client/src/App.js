import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import './css/eventScreen.css';
import EventScreen from './components/EventScreen';
import {BrowserRouter as Router , Switch,Route, Link} from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import AddEvents from './components/AddEvents';
import AddScripts from './components/AddScripts';
import ScriptsScreen from './components/ScriptsScreen';
import EditEvents from './components/EditEvents';
import EditScripts from './components/EditScripts';
import ViewScripts from './components/viewScripts';
import ViewEvents from './components/viewEvents';
import ContributeScripts from './components/contributeScripts';
import EditContributedScripts from './components/EditContributedScripts';
import ViewContributedScripts from './components/ViewContributedScripts';
function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component = {EventScreen}/>
          <Route exact path="/login" component = {LoginScreen}/>
          <Route exact path="/signup" component = {SignUpScreen}/>
          <Route exact path="/add-event" component = {AddEvents}/>
          <Route exact path="/edit-event/:id" component = {EditEvents}/>
          <Route exact path="/add-script" component = {AddScripts}/>
          <Route exact path="/edit-script/:id" component={EditScripts}/>
          <Route exact path="/scripts" component = {ScriptsScreen}/>
          <Route exact path="/view-script/:id" component={ViewScripts}/>
          <Route exact path="/view-event/:id" component={ViewEvents}/>
          <Route exact path="/contribute-scripts" component={ContributeScripts}/>
          <Route exact path="/edit-contributed-scripts/:id" component={EditContributedScripts}/>
          <Route exact path="/view-contributed-scripts" component={ViewContributedScripts}/>
        
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
