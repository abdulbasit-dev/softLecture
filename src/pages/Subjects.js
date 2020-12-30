import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@material-ui/core';
import firebase from 'firebase';
import { db } from '../firebase';
import { LectureContext } from '../LectureConetxt';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStyles } from '../assets/styles.js';

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

function Subjects() {
  const [state] = useContext(LectureContext);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [subjects, setSubjects] = useState([]);
  const { stage } = useParams();
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState('');

  // modal
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  useEffect(() => {
    db.collection(`stage${stage[0]}`)
      .orderBy('subjectName')
      .onSnapshot((snapshot) => {
        setSubjects(
          snapshot.docs.map((doc) => ({ id: doc.id, subject: doc.data() })),
        );
        setLoading(false);
      });
  }, [stage]);

  function createSubject(e) {
    e.preventDefault();
    if (stage[0] === state.user.email.substring(5, 6)) {
      db.collection('stage4').add({
        teacherName,
        subjectName,
        videoUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setSubjectName('');
      setTeacherName('');
    } else {
      alert('your are not allowd to upload to this stage');
    }
  }

  function deleteSubject(id) {
    db.collection(`stage${stage[0]}`).doc(id).delete();
  }

  return (
    <div className="container">
      <div className="mb-8">
        <div className="flex items-center mb-3">
          <h1 className="text-3xl font-medium text-gray-700 capitalize mr-4 ">
            {stage[0]} Stage Subjects
          </h1>
          {state.user && (
            <IconButton
              aria-label="open modal"
              color="secondary"
              className="focus:outline-none"
              onClick={() => setOpenCreateModal(true)}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
          )}
        </div>
        <div className="bg-gray-500 h-1 w-1/4 rounded-lg"></div>
      </div>

      <div className="row">
        <div className="offset-md-5">
          {loading && <CircularProgress size={100} />}
        </div>
      </div>
      <div className="row">
        {subjects &&
          subjects.map((item) => (
            <div
              className="col-lg-3 col-md-4 col-sm-6 mb-8 relative"
              key={item.id}
            >
              {state.user && (
                <div
                  className="absolute top-0 right-0"
                  onClick={() => deleteSubject(item.id)}
                >
                  <IconButton
                    aria-label="download"
                    color="secondary"
                    className="focus:outline-none focus:border-none "
                  >
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </div>
              )}
              <div className="bg-indigo-600   rounded-lg p-6">
                <h1 className="text-white font-semibold text-2xl">
                  {item.subject?.subjectName}
                </h1>
                <p className="text-lg text-gray-400 mt-1">
                  {item.subject?.teacherName}
                </p>
                <div className="flex mt-1 text-gray-300">
                  <span className="mr-4">12 lectures</span>
                </div>
                <div className="mt-2">
                  <Link
                    to={`/subjects/${stage}/lectures/${item.subject.subjectName.trim()}_${
                      item.id
                    }`}
                  >
                    <button className="text-gray-300 hover:bg-blue-500 hover:text-white px-2 py-1 text-lg border border-gray-300 rounded-lg mr-4">
                      Lectuers
                    </button>
                  </Link>
                  <Link
                    to={`/subjects/${stage}/videos/${item.subject.subjectName.trim()}_${
                      item.id
                    }`}
                  >
                    <button className="text-gray-300 px-2 py-1 hover:bg-blue-500 hover:text-white text-lg border border-gray-300 rounded-lg">
                      Videos
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        {/* CreateModal */}
        <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
          <div style={modalStyle} className={classes.paper}>
            <div className="my-2">
              <h2 className="text-2xl text-gray-600 ">Add Subject</h2>
              <small className="text-red-500 text-sm">
                *Plase fill all fields
              </small>
            </div>
            <form className={classes.form} noValidate onSubmit={createSubject}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="subjname"
                label="Subject Name"
                name="subjname"
                type="text"
                autoComplete="subjname"
                autoFocus
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="teacher name"
                label="Teacher Name"
                name="teacher name"
                type="text"
                autoComplete="teacher name"
                autoFocus
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="teacher name"
                label="Teacher Name"
                name="teacher name"
                type="text"
                autoComplete="teacher name"
                autoFocus
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={false}
                className="mt-3"
              >
                Create Subject
              </Button>
            </form>
          </div>
        </Modal>
        {/* edit modal */}
        {/* confirm delete */}
      </div>
    </div>
  );
}

export default Subjects;
