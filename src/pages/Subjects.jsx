import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {Button, IconButton, Modal, TextField} from '@material-ui/core';
import firebase from 'firebase';
import {db} from '../firebase';
import {LectureContext} from '../LectureConetxt';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import CircularProgress from '@material-ui/core/CircularProgress';
import {useStyles} from '../assets/styles.js';
import SubjectCard from '../components/SubjectCard';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';

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
  const [videoUrl, setVideoUrl] = useState('');

  const [subjects, setSubjects] = useState([]);
  const {stage} = useParams();
  const [loading, setLoading] = useState(true);

  // modal
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  useEffect(() => {
    db.collection(`stage${stage[0]}`)
      .orderBy('subjectName')
      .onSnapshot(snapshot => {
        setSubjects(
          snapshot.docs.map(doc => ({id: doc.id, subject: doc.data()}))
        );
        setLoading(false);
      });
  }, [stage]);

  function createSubject(e) {
    e.preventDefault();
    if (stage[0] === state.user.email.substring(5, 6)) {
      if (subjectName.length !== 0 && teacherName.length !== 0) {
        db.collection(`stage${stage[0]}`).add({
          teacherName,
          subjectName,
          videoUrl,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setSubjectName('');
        setTeacherName('');
        setVideoUrl('');
        setOpenCreateModal(false);
      } else {
        alert('please fill all fields');
      }
    } else {
      alert('your are not allowd to upload to this stage');
    }
  }

  return (
    <React.Fragment>
      {loading ? (
        <div
          className='d-flex justify-center items-center'
          style={{height: '50vh'}}
        >
          <div className=''>{loading && <CircularProgress size={80} />}</div>
        </div>
      ) : (
        <React.Fragment>
          <div className='container mb-16'>
            <BackButton />
            <div className='mb-8'>
              <div className='flex items-center mb-3'>
                <h1 className='text-3xl font-medium text-gray-700 capitalize mr-4 '>
                  {stage[0]} Stage Subjects
                </h1>
                {state.user && (
                  <IconButton
                    aria-label='open modal'
                    color='secondary'
                    className='focus:outline-none'
                    onClick={() => setOpenCreateModal(true)}
                  >
                    <AddCircleIcon fontSize='large' />
                  </IconButton>
                )}
              </div>
              <div className='bg-gray-500 h-1 w-1/3 rounded-lg'></div>
            </div>

            <div className='row'></div>
            <div className='row'>
              {subjects.length !== 0 &&
                subjects.map(item => <SubjectCard key={item.id} item={item} />)}
              {!loading && subjects.length === 0 && (
                <h1 className='text-3xl text-red-400 text-center p-4'>
                  Sorry No Subject uploaded yet 😥
                </h1>
              )}

              {/* CreateModal */}
              <Modal
                open={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
              >
                <div style={modalStyle} className={classes.paper}>
                  <div className='my-2'>
                    <h2 className='text-2xl text-gray-600 '>Add Subject</h2>
                    <small className='text-red-500 text-sm'>
                      *Please fill all fields
                    </small>
                    <small className='block capitalize text-sm text-gray-500'>
                      if a subject dose not have video yet leave the video field
                      empty
                    </small>
                  </div>
                  <form
                    className={classes.form}
                    noValidate
                    onSubmit={createSubject}
                  >
                    <TextField
                      variant='outlined'
                      margin='normal'
                      required
                      fullWidth
                      id='subjname'
                      label='Subject Name'
                      name='subjname'
                      type='text'
                      autoComplete='subjname'
                      autoFocus
                      value={subjectName}
                      onChange={e => setSubjectName(e.target.value)}
                    />
                    <TextField
                      variant='outlined'
                      margin='normal'
                      required
                      fullWidth
                      id='teacher name'
                      label='Teacher Name'
                      name='teacher name'
                      type='text'
                      autoComplete='teacher name'
                      value={teacherName}
                      onChange={e => setTeacherName(e.target.value)}
                    />
                    <TextField
                      variant='outlined'
                      margin='normal'
                      required
                      fullWidth
                      id='videoUrl'
                      label='Video Folder Url'
                      name='videoUrl'
                      type='text'
                      autoComplete='videoUrl'
                      value={videoUrl}
                      onChange={e => setVideoUrl(e.target.value)}
                    />

                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      color='primary'
                      disabled={false}
                      className='mt-3'
                    >
                      Create Subject
                    </Button>
                  </form>
                </div>
              </Modal>
            </div>
          </div>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Subjects;
