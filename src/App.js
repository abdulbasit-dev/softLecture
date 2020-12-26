import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Error404 from './pages/Error404';
import HomePage from './pages/HomePage';
// import Lectures from './pages/Lectures';
import Subjects from './pages/Subjects';
import './App.css';
import Header from './components/Header';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact>
            <Header />
            <HomePage />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/subjects/:stage">
            <Subjects />
          </Route>
         
          {/* <Route path="/lectures" exact component={Lectures} /> */}
          <Route component={Error404} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
