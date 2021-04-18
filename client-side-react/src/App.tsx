import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom"

import Home from "./components/home/Home";
import LogIn from "./components/LogIn";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={LogIn}/>
      <Route exact path="/register" component={Register}/>
    </Router>
  );
}

export default App;
