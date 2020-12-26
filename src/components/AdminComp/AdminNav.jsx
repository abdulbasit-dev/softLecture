import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { db, auth } from '../../firebase';
import { Button, FormControl, Input } from '@material-ui/core';
import { ACTIONS, LectureContext } from '../../LectureConetxt';
import { Link } from 'react-router-dom';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function AdminNav() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  const [state, dispatch] = useContext(LectureContext);

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //mean the user is logged in

        dispatch({ type: ACTIONS.USER, user: authUser });
        setUser(authUser);
      } else {
        //the user is logged out

        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  function handleLogout() {
    auth.signOut();
    dispatch({ type: ACTIONS.USER, user: null });
  }

  return (
    <nav className="bg-gray-800 pt-2 px-6 md:pt-1 pb-1  mt-0 h-auto fixed w-full z-20 top-0">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
          <Link to="/admin">Admin Dahboard</Link>
        </div>

        <div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
          <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
            {!state.user && (
              <li className="flex-1 md:flex-none md:mr-3">
                <button
                  className="inline-block py-2 px-4 text-white no-underline"
                  onClick={() => setOpenSignIn(true)}
                >
                  Sign In
                </button>
              </li>
            )}

            {state.user && (
              <li className="flex-1 md:flex-none md:mr-3">
                <button
                  className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* sign in modal */}
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
              className="app__headerImage"
            />
          </center>
          <form className="app__signupForm">
            <FormControl>
              <Input
                type="emial"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={signIn}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
    </nav>
  );
}

export default AdminNav;
