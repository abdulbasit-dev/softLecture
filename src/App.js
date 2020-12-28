import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Error404 from './pages/Error404';
import HomePage from './pages/HomePage';
// import Lectures from './pages/Lectures';
import Subjects from './pages/Subjects';
import './App.css';
import Header from './components/Header';
// import Admin from './pages/Admin';
import SignIn from './components/Signin';
import { auth } from './firebase';
import { ACTIONS, LectureContext } from './LectureConetxt';
import Lectures from './components/Lectures';

function App() {
  const [state, dispatch] = useContext(LectureContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //mean the user is logged in
        dispatch({ type: ACTIONS.USER, user: authUser });
        // setUser(authUser);
      } else {
        //the user is logged out
        // setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [state.user, dispatch]);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact>
            <Header />
            <HomePage />
          </Route>
          <Route path="/admin/signin" exact>
            <SignIn />
          </Route>
          <Route path="/subjects/lectures/:id">
            <Header shadow />
            <Lectures />
          </Route>
          <Route path="/subjects/videos/:id">
            <Header shadow />
            <h1>all online videos</h1>
          </Route>
          <Route path="/subjects/:stage">
            <Header shadow />
            <Subjects />
          </Route>
          {/* <Route path="/admin">
            <Admin />
          </Route> */}
          <Route component={Error404} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
