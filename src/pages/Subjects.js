import { Button, TextField, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CardComponent from '../components/CardComponent';
import firebase from 'firebase';
import { db } from '../firebase';
import { LectureContext } from '../LectureConetxt';

function Subjects() {
  const [state] = useContext(LectureContext);
  const [subjectName, setSubjectName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [subjects, setSubjects] = useState([]);
  const { stage } = useParams();

  useEffect(() => {
    db.collection('stage4')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setSubjects(
          snapshot.docs.map((doc) => ({ id: doc.id, subject: doc.data() })),
        );
      });
  }, []);

  console.log(subjects);

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
      <>
        <h1>All subject </h1>

        {subjects &&
          subjects.map((item) => (
            <div>
              <h1>{item.subject?.subjectName}</h1>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Subjects;
