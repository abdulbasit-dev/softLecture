import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Error404 from './pages/Error404';
import HomePage from './pages/HomePage';
import Lectures from './pages/Lectures';
import Subjects from './pages/Subjects';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/subjects" exact component={Subjects} />
          <Route path="/lectures" exact component={Lectures} />
          <Route component={Error404} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
