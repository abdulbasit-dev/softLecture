import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  TextField,
  Checkbox,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import { storage, db } from '../../firebase';
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
  button: {
    margin: theme.spacing(1),
  },

  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Content() {
  const [openLuctureUpload, setOpenLuctureUpload] = useState(false);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  function handleUpload(e) {
    e.preventDefault();
    //put on firebase
    // const uploadImg = storage.ref(`images/${file.name}`).put(file);

    // //get download link ,and put this link in the firestore
    // uploadImg.on(
    //   'state_changed',
    //   (snapshot) => {
    //     //get progress number
    //     // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    //     // setProgress(progress)
    //   },
    //   (error) => alert(error.message),
    //   () => {
    //     //complet function
    //     storage
    //       .ref('images')
    //       .child(file.name)
    //       .getDownloadURL()
    //       .then((url) => {
    //         db.collection('memes').add({
    //           url,
    //           name: file.name,
    //           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //         });
    //         // history.push('/')
    //         // setLanguag('')
    //         // setGenra('')
    //         // setProgress(0)
    //         setFile(null);
    //       });
    //   },
    // );
  }

  return (
    <div>
      <div className="bg-gray-800 pt-3">
        <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
          <h3 className="font-bold pl-2">Analytics</h3>
        </div>
      </div>
      <div className="flex">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<AddCircleIcon />}
          onClick={() => setOpenLuctureUpload(true)}
        >
          Add Lecture
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<AddCircleIcon />}
        >
          Add Video
        </Button>
      </div>
      {/* upload lecture modal */}
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
      <Modal
        open={openLuctureUpload}
        onClose={() => setOpenLuctureUpload(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
              className="app__headerImage"
            />
          </center>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Content;
