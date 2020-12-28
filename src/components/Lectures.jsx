import {
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage } from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import firebase from 'firebase';

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
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

function Lectures() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [teacherName, setTeacherName] = useState('');
  const [url, setUrl] = useState(null);
  const [lectures, setLectures] = useState(null);
  const [loading, setLoading] = useState(true);

  const classes = useStyles();

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const { id } = useParams();

  const types = ['pdf', 'pptx'];

  function handleChange(e) {
    let selected = e.target.files[0];
    setFile(selected);
    // let selected = e.target.files[0];
    // //only update the state when we have files selcted
    // //check if we have files and valid  types
    // if (selected && types.includes(selected.type)) {
    //   setFile(e.target.files[0]);
    //   setError(null);
    // } else {
    //   setFile(null);
    //   setError('Please select an image file (pdf or ppt)');
    // }
  }

  console.log(file);

  // const [subjects, setSubjects] = useState([]);
  // useEffect(() => {
  //   db.collection('stage4')
  //     .orderBy('timestamp', 'desc')
  //     .onSnapshot((snapshot) => {
  //       setSubjects(
  //         snapshot.docs.map((doc) => ({ id: doc.id, subject: doc.data() })),
  //       );
  //     });
  // }, []);

  // get all subjects
  // console.log(subjects.map(({ subject }) => subject.subjectName));

  useEffect(() => {
    db.collection('stage4')
      .doc(id.split('_')[1])
      .collection('lectures')
      .onSnapshot((snapshot) => {
        setLectures(
          snapshot.docs.map((doc) => ({ id: doc.id, lecture: doc.data() })),
        );
        setLoading(false);
      });
  }, [id]);

  const upload = (e) => {
    e.preventDefault();
    setOpen(false);
    //get a reffrece for where the file should save in firebase
    const storageRef = storage.ref(`lecture/${file.name}`);

    storageRef.put(file).on(
      'state_changed',
      (snapshot) => {
        const percentage = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      //this function fire when the upload fully complete
      async () => {
        const url = await storageRef.getDownloadURL();
        db.collection('stage4')
          .doc(id.split('_')[1])
          .collection('lectures')
          .add({
            url,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            teacherName,
            name: file.name,
          });
        setUrl(url);
        setProgress(0);
        setFile(null);
      },
    );
  };

  return (
    <div className="container ">
      <h1 className="mb-8">see all lectuare</h1>

      <button
        className="bg-blue-400 hover:bg-blue-500 px-4 py-2 font-semibold text-white rounded-lg mb-6"
        onClick={() => setOpen(true)}
      >
        Add lecture
      </button>

      {progress && <CircularProgressWithLabel value={progress} />}

      <div className="offset-md-5">
        {loading && <CircularProgress size={100} />}
      </div>
      {lectures && (
        <div className="flex flex-col shadow-lg">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Size
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Download
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {lectures.map((item, index) => (
                      <tr key={item.id}>
                        <td className="px-6 py-0.1 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-0.1 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {item.lecture.name}
                          </div>
                        </td>

                        <td className="px-6 py-0.1 whitespace-nowrap">
                          <span className="pr-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-0.1 whitespace-nowrap text-sm text-gray-500">
                          <a href={item.lecture.url}>
                            <IconButton
                              aria-label="download"
                              color="primary"
                              className="focus:outline-none focus:border-none "
                            >
                              <GetAppIcon fontSize="large" />
                            </IconButton>
                          </a>
                        </td>
                        <td className="px-6 py-0.1 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* sign in modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
              className="app__headerImage"
            />
          </center>
          <form className="app__signupForm">
            {/* <FormControl>
              <Input
                type="text"
                placeholder="lecture name"
                value={lectureName}
                onChange={(e) => setLectureName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                type="text"
                placeholder="teacher name"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
              />
            </FormControl> */}
            <input type="file" onChange={handleChange} />

            {error && <div className="error">{error}</div>}
            {file && <div className="">{file.name}</div>}

            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={upload}
            >
              Upload Lecture
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Lectures;
