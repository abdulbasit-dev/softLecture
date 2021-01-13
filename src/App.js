import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { auth } from "./firebase";
import { ACTIONS, LectureContext } from "./LectureConetxt";
import Error404 from "./pages/Error404/Error404";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/Signin";
import Header from "./components/Header";
import Subjects from "./pages/Subjects";
import Lectures from "./pages/Lectures";
import "./App.css";
import About from "./pages/About";

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
          <Route path="/about" exact>
            <Header shadow />
            <About />
          </Route>
          <Route path="/feedback" exact>
            <Header shadow />
            <About />
          </Route>
          <Route path="/admin/signin" exact>
            <SignIn />
          </Route>
          <Route path="/subjects/:stage/lectures/:id" exact>
            <Header shadow />
            <Lectures />
          </Route>
          <Route path="/subjects/:stage" exact>
            <Header shadow />
            <Subjects />
          </Route>
          <Route component={Error404} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
