import React, { useContext, useState } from 'react';
import { LectureContext } from '../LectureConetxt';
import { Link, useParams } from 'react-router-dom';

import { Button, IconButton, Modal, TextField } from '@material-ui/core';
import firebase from 'firebase';
import { db } from '../firebase';

import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import { useStyles } from '../assets/styles.js';

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

function SubjectCard({ item }) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [subjectName, setSubjectName] = useState(item.subject.subjectName);
  const [teacherName, setTeacherName] = useState(item.subject.teacherName);
  const [videoUrl, setVideoUrl] = useState(item?.subject.videoUrl);
  const [state] = useContext(LectureContext);
  const { stage } = useParams();

  // modal
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  console.log(item);

  function editSubject(e) {
    e.preventDefault();
    if (stage[0] === state.user.email.substring(5, 6)) {
      if (
        subjectName.length !== 0 &&
        teacherName.length !== 0 &&
        videoUrl.length !== 0
      ) {
        db.collection('stage4').doc(item.id).set(
          {
            teacherName,
            subjectName,
            videoUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true },
        );

        setOpenEditModal(false);
      } else {
        alert('please fill all fields');
      }
    } else {
      alert('your are not allowd to edit for this stage');
    }
  }

  function deleteSubject(id) {
    db.collection(`stage${stage[0]}`).doc(id).delete();
  }

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-8 relative">
      {state.user && (
        <div className="absolute top-0 right-0">
          <div className="flex flex-col justify-center mr-3">
            <IconButton
              aria-label="delete"
              color="secondary"
              className="focus:outline-none"
              onClick={() => setOpenConfirmDeleteModal(true)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="edit"
              onClick={() => setOpenEditModal(true)}
              className="focus:outline-none"
            >
              <SettingsIcon className="text-green-400" />
            </IconButton>
          </div>
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
          <a href={item.subject.videoUrl} rel="noreferrer" target="_blank">
            <button className="text-gray-300 px-2 py-1 hover:bg-blue-500 hover:text-white text-lg border border-gray-300 rounded-lg">
              Videos
            </button>
          </a>
        </div>
      </div>
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <div style={modalStyle} className={classes.paper}>
          <div className="my-2">
            <h2 className="text-2xl text-gray-600 ">Edit Subject</h2>
            <small className="text-red-500 text-sm">
              *Plase fill all fields
            </small>
          </div>
          <form className={classes.form} noValidate onSubmit={editSubject}>
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
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="videoUrl"
              label="Video Folder Url"
              name="videoUrl"
              type="text"
              autoComplete="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              className="mt-3"
            >
              update Subject
            </Button>
          </form>
        </div>
      </Modal>

      {/* confirm delete  */}
      <Modal
        open={openConfirmDeleteModal}
        onClose={() => setOpenConfirmDeleteModal(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <div className="my-2">
            <h2 className="text-xl text-gray-600 mb-2">
              Are you sure you went to delete{' '}
              <span className="text-indigo-600 font-medium capitalize ">
                "{item.subject.subjectName}"
              </span>{' '}
              subject?
            </h2>
            <p className="text-red-500 text-sm">
              by deleting this, all the lectures that belongs to this subject it
              be deleted too.
            </p>
          </div>
          <div className="flex justify-end mt-6">
            <div className="mr-3">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => deleteSubject(item.id)}
              >
                Delete Subject
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                onClick={() => setOpenConfirmDeleteModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SubjectCard;
