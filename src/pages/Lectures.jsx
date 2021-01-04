import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage } from '../firebase';
import firebase from 'firebase';

import CircularProgress from '@material-ui/core/CircularProgress';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { LectureContext } from '../LectureConetxt';
import LectureItem from '../components/LectureItem';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';
import { useStyles, getModalStyle } from '../assets/styles';
import {
  Button,
  Radio,
  FormControl,
  FormControlLabel,
  IconButton,
  Modal,
  RadioGroup,
  TextField,
  FormLabel,
} from '@material-ui/core';
import BackButton from '../components/BackButton';

function Lectures() {
  const [state] = useContext(LectureContext);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [order, setOrder] = useState('');
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [lectureType, setLectureType] = useState('theory');
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const { stage, id } = useParams();

  // modal
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  const types = ['pdf', 'ppt', 'pptx', 'txt'];

  function handleChange(e) {
    let selected = e.target.files[0];
    const extArr = selected.name.split('.');
    const ext = selected.name.split('.')[extArr.length - 1];

    //only update the state when we have files selcted
    //check if we have files and valid  types
    if (selected && types.includes(ext)) {
      if (selected.size <= 75000000) {
        setFile(e.target.files[0]);
        setError(null);
      } else {
        setFile(null);
        setError('Pleas select a file with size 20mb or less');
      }
    } else {
      setFile(null);
      setError('Please select a file file (pdf, ppt, pptx, txt)');
    }
  }

  useEffect(() => {
    db.collection(`stage${stage[0]}`)
      .doc(id.split('_')[1])
      .collection('lectures')
      .orderBy('order')
      .onSnapshot((snapshot) => {
        setLectures(
          snapshot.docs.map((doc) => ({ id: doc.id, lecture: doc.data() })),
        );
        setLoading(false);
      });
  }, [id, stage]);

  const upload = (e) => {
    e.preventDefault();
    if (Number.isInteger(order) && lectureType) {
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
          //this stage come from the email
          db.collection(`stage${stage[0]}`)
            .doc(id.split('_')[1])
            .collection('lectures')
            .add({
              url,
              order,
              type: lectureType,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              name: file.name,
            });

          setProgress(0);
          setFile(null);
          setOrder('');
          setLectureType('theory');

          setOpen(false);
        },
      );
    } else {
      alert('please fill order and lecture type feild');
    }
  };

  return (
    <div className="container">
      <BackButton />
      <div className="row">
        <div className="offset-md-5">
          {loading && <CircularProgress size={80} />}
        </div>
      </div>

      <div className="flex flex-col shadow-lg">
        <div className="flex items-center">
          <h1 className="m-3  text-3xl text-gray-600">
            All{' '}
            <span className="text-blue-500 font-medium">
              "{id.split('_')[0]}"
            </span>{' '}
            lectuers{' '}
          </h1>
          {state.user && (
            <IconButton
              aria-label="open modal"
              color="secondary"
              className="focus:outline-none"
              onClick={() => setOpen(true)}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
          )}
        </div>
        {lectures.length !== 0 ? (
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
                        Type
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Download
                      </th>

                      {state.user && (
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex justify-center"
                        >
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {lectures.map((item, index) => (
                      <LectureItem key={item.id} item={item} index={index} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-3xl text-red-400 text-center p-4">
            Sorry No lectuer Found for {id.split('_')[0]} 😥
          </h1>
        )}
      </div>

      {/* upload model */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <div className="my-2">
            <h2 className="text-xl text-gray-600 mb-2">
              Adding Lecture for {''}
              <span className="text-indigo-600 font-medium capitalize ">
                "{id.split('_')[0]}"
              </span>{' '}
              subject?
            </h2>
            <p className="text-green-600 text-sm">
              please select the file with type of (pdf, ppt, pptx, txt)
            </p>
          </div>

          <div className="mt-8">
            <div className="flex">
              <form className="border-separate" onSubmit={upload}>
                <div className="mb-3">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    id="lectureOrder"
                    label="lecture Order"
                    name="lectureOrder"
                    type="number"
                    autoFocus
                    value={order}
                    onChange={(e) => setOrder(parseInt(e.target.value))}
                  />
                </div>
                <div className="mb-3">
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      Choose Lecture Type
                    </FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={lectureType}
                      onChange={(e) => setLectureType(e.target.value)}
                    >
                      <FormControlLabel
                        value="theory"
                        control={<Radio />}
                        label="Theory"
                      />
                      <FormControlLabel
                        value="practic"
                        control={<Radio />}
                        label="Practic"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="mb-3">
                  <input type="file" onChange={handleChange} />
                  {error && (
                    <div className="text-sm text-red-600 ">{error}</div>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!file}
                  className="focus:outline-none mt-3"
                >
                  Upload Lecture
                </Button>
              </form>
              <div className="self-end">
                {progress ? (
                  <CircularProgressWithLabel value={progress} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Lectures;
