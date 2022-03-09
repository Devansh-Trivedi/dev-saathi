import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProjectList from './components/screens/ProjectList';
import Home from './components/screens/Home'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>
      <div>

        <Switch>
          <Route path="/ProjectList">
            <ProjectList />
          </Route>
    
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// function SHome() {
//   return <h2>SHome</h2>;
// }
