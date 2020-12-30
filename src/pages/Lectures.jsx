import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage } from '../firebase';
import firebase from 'firebase';
import { IconButton } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CircularProgress from '@material-ui/core/CircularProgress';

import { LectureContext } from '../LectureConetxt';
import CircularProgressWithLabel from '../components/CircularProgressWithLabel';

function Lectures() {
  const [state] = useContext(LectureContext);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [teacherName, setTeacherName] = useState('');
  const [url, setUrl] = useState(null);
  const [lectures, setLectures] = useState(null);
  const [loading, setLoading] = useState(true);
  const { stage } = useParams();

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

  useEffect(() => {
    db.collection(`stage${stage[0]}`)
      .doc(id.split('_')[1])
      .collection('lectures')
      .onSnapshot((snapshot) => {
        setLectures(
          snapshot.docs.map((doc) => ({ id: doc.id, lecture: doc.data() })),
        );
        // setLoading(false);
      });
  }, [id, stage]);

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
        //this stage come from the email
        db.collection(`stage${stage[0]}`)
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

  console.log(lectures);

  return (
    <div className="container">
      <div className="row">
        <div className={`items-center ${loading && 'pt-64'}`}>
          {loading && <CircularProgress size={60} />}
        </div>
      </div>

      {state.user && (
        <>
          <form className="border-separate">
            <div className="mb-2">
              <input type="file" onChange={handleChange} />
              {error && <div className="text-sm text-red-600 ">{error}</div>}
              {file && <div className="text-gray-500">{file.name}</div>}
            </div>

            <button
              className="bg-blue-400 hover:bg-blue-500 px-4 py-2 font-semibold text-white rounded-lg mb-6"
              onClick={upload}
            >
              Add lecture
            </button>
          </form>
          {progress ? <CircularProgressWithLabel value={progress} /> : null}
        </>
      )}

      <div className="flex flex-col shadow-lg">
        {lectures && (
          <>
            <h1 className="m-3 text-3xl text-blue-600">
              All {id.split('_')[0]} lectuers{' '}
            </h1>
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
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          View
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Edit
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
                          <td className="pr-6 pl-3 py-0.1 whitespace-nowrap text-sm text-gray-500">
                            <a href={item.lecture.url}>
                              <IconButton
                                aria-label="download"
                                color="primary"
                                className="focus:outline-none focus:border-none "
                              >
                                <VisibilityIcon fontSize="large" />
                              </IconButton>
                            </a>
                          </td>
                          <td className="px-6 pl-3 py-0.1 whitespace-nowrap text-right text-sm font-medium flex">
                            <IconButton
                              aria-label="edit"
                              color="primary"
                              className="focus:outline-none focus:border-none "
                            >
                              <EditIcon fontSize="large" />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
        {lectures?.length === 0 && (
          <h1 className="text-3xl text-red-400 text-center p-4">
            Sorry No lectuer Found for {id.split('_')[0]} 😥
          </h1>
        )}
      </div>
    </div>
  );
}

export default Lectures;
