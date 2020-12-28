import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Button, TextField, Typography } from '@material-ui/core';
import firebase from 'firebase';
import { db } from '../firebase';
import { LectureContext } from '../LectureConetxt';

import CircularProgress from '@material-ui/core/CircularProgress';

function Subjects() {
  const [state] = useContext(LectureContext);
  const [subjectName, setSubjectName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [subjects, setSubjects] = useState([]);
  const { stage } = useParams();
  const [loading, setLoading] = useState(true);

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
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setSubjectName('');
      setTeacherName('');
    } else {
      alert('your are not allowd to upload to this stage');
    }
  }

  return (
    <div className="container">
      {state.user && (
        <div className="w-1/4 mb-8">
          <Typography className="text-center" component="h1" variant="h5">
            Add Subject
          </Typography>
          <form noValidate>
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={createSubject}
            >
              Create
            </Button>
          </form>
        </div>
      )}

      <h1 className="text-3xl font-medium mb-8">{stage[0]} Stage Subjects</h1>
      <div className="row">
        <div className="offset-md-5">
          {loading && <CircularProgress size={100} />}
        </div>
      </div>
      <div className="row">
        {subjects &&
          subjects.map((item) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-8" key={item.id}>
              <div className="bg-indigo-600   rounded-lg p-6">
                <h1 className="text-white font-semibold text-2xl">
                  {item.subject?.subjectName}
                </h1>
                <p className="text-lg text-gray-400 mt-1">
                  {item.subject?.teacherName}
                </p>
                <div className="flex mt-1 text-gray-300">
                  <span className="mr-4">12 lectures</span>
                  <span>8 videos</span>
                </div>
                <div className="mt-2">
                  <Link
                    to={`/subjects/lectures/${item.subject.subjectName.trim()}_${
                      item.id
                    }`}
                  >
                    <button className="text-gray-300 hover:bg-blue-500 hover:text-white px-2 py-1 text-lg border border-gray-300 rounded-lg mr-4">
                      Lectuers
                    </button>
                  </Link>
                  <Link
                    to={`/subjects/videos/${item.subject.subjectName.trim()}_${
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
      </div>
    </div>
  );
}

export default Subjects;
