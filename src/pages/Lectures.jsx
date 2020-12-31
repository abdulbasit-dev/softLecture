import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage } from '../firebase';
import firebase from 'firebase';

import CircularProgress from '@material-ui/core/CircularProgress';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { LectureContext } from '../LectureConetxt';
import LectureItem from '../components/LectureItem';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';
import { useStyles } from '../assets/styles';
import { Button, IconButton, Modal } from '@material-ui/core';

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

function Lectures() {
  const [state] = useContext(LectureContext);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const { stage } = useParams();
  const { id } = useParams();

  // modal
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  const types = ['pdf', 'ppt', 'pptx', 'text/plain'];

  function handleChange(e) {
    let selected = e.target.files[0];
    const ext = selected.name.split('.')[1];

    //only update the state when we have files selcted
    //check if we have files and valid  types
    if (selected && types.includes(ext)) {
      setFile(e.target.files[0]);
      setError(null);
    } else {
      setFile(null);
      setError('Please select an image file (pdf or ppt)');
    }
  }

  console.log(file);

  useEffect(() => {
    db.collection(`stage${stage[0]}`)
      .doc(id.split('_')[1])
      .collection('lectures')
      .onSnapshot((snapshot) => {
        setLectures(
          snapshot.docs.map((doc) => ({ id: doc.id, lecture: doc.data() })),
        );
        setLoading(false);
      });
  }, [id, stage]);

  const upload = (e) => {
    e.preventDefault();

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
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            name: file.name,
          });

        setProgress(0);
        setFile(null);
        setOpen(false);
      },
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="offset-md-5">
          {loading && <CircularProgress size={80} />}
        </div>
      </div>

      <div className="flex flex-col shadow-lg">
        {lectures.lenght !== 0 ? (
          <>
            <div className="flex items-center">
              <h1 className="m-3 text-3xl text-blue-600">
                All {id.split('_')[0]} lectuers{' '}
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
                          Download
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          View
                        </th>
                        {state.user && (
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Edit
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
          </>
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
            <p className="text-red-500 text-sm">
              please select the file with size less than 10mb , and type of
              [pdf,doc,ppt]
            </p>
          </div>
          <div className="mt-8">
            <>
              <form className="border-separate" onSubmit={upload}>
                <div className="mb-2">
                  <input type="file" onChange={handleChange} />
                  {error && (
                    <div className="text-sm text-red-600 ">{error}</div>
                  )}
                  {file && <div className="text-gray-500">{file.name}</div>}
                </div>

                <button
                  className="bg-blue-400 hover:bg-blue-500 px-4 py-2 font-semibold text-white rounded-lg mb-6"
                  type="submit"
                >
                  Add lecture
                </button>
              </form>
              {progress ? <CircularProgressWithLabel value={progress} /> : null}
            </>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Lectures;
