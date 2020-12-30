import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';

import {
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  TextField,
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { db } from '../firebase';

import CircularProgress from '@material-ui/core/CircularProgress';

import { LectureContext } from '../LectureConetxt';
import { useStyles } from '../assets/styles.js';

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

function Videos() {
  const [state] = useContext(LectureContext);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { stage } = useParams();

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    db.collection(`stage${stage[0]}`)
      .doc(id.split('_')[1])
      .collection('videos')
      .orderBy('timestamp')
      .onSnapshot((snapshot) => {
        setVideos(
          snapshot.docs.map((doc) => ({ id: doc.id, video: doc.data() })),
        );
        setLoading(false);
      });
  }, [id, stage]);

  function openUploadModel() {
    if (stage[0] === state.user.email.substring(5, 6)) {
      setOpen(true);
    } else {
      alert('your are not allowd to upload to this stage');
    }
  }

  const upload = (e) => {
    e.preventDefault();
    if (!name) alert('Please fill name field');
    else if (!url) alert('Please fill url field');
    else {
      db.collection(`stage${stage[0]}`)
        .doc(id.split('_')[1])
        .collection('videos')
        .add({
          url,
          name,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

      setUrl('');
      setName('');
      setOpen(false);
    }
  };

  console.log(videos);

  return (
    <div className="container">
      <div className="flex justify-center">
        <div className={`items-center ${loading && 'pt-64'}`}>
          {loading && (
            <CircularProgress size={60} thickness={4.5} color="secondary" />
          )}
        </div>
      </div>

      {state.user && (
        <>
          <button
            className="bg-blue-400 hover:bg-blue-500 px-4 py-2 font-semibold text-white rounded-lg mb-6"
            onClick={openUploadModel}
          >
            Add Video
          </button>
        </>
      )}

      {videos?.length === 0 && (
        <h1 className="text-3xl text-red-400 text-center p-4 mt-3 shadow-lg">
          Sorry There is No Video Found for {id.split('_')[0]} 😥
        </h1>
      )}

      <div className="flex flex-col shadow-lg">
        {videos && (
          <>
            <h1 className="m-3 text-3xl text-blue-600">
              All {id.split('_')[0]} videos{' '}
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
                          View
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
                          Edit
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {videos.map((item, index) => (
                        <tr key={item.id}>
                          <td className="px-6 py-0.1 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {index + 1}
                            </div>
                          </td>
                          <td className="px-6 py-0.1 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {item.video.name}
                            </div>
                          </td>

                          <td className="pr-6 pl-3 py-0.1 whitespace-nowrap text-sm text-gray-500">
                            <a href={item.video.url} target="_blank">
                              <IconButton
                                aria-label="download"
                                color="primary"
                                className="focus:outline-none focus:border-none "
                              >
                                <VisibilityIcon fontSize="large" />
                              </IconButton>
                            </a>
                          </td>
                          <td className="px-6 py-0.1 whitespace-nowrap text-sm text-gray-500">
                            <a href={item.video.url} rel="no" target="_blank">
                              <IconButton
                                aria-label="download"
                                color="primary"
                                className="focus:outline-none focus:border-none "
                              >
                                <GetAppIcon fontSize="large" />
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
      </div>

      {/* modals  */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <div className="my-2">
            <h2 className="text-2xl">Add lecture video</h2>
            <small className="text-red-500 text-sm">
              *Plase fill both name and url field
            </small>
          </div>
          <form className={classes.form} noValidate onSubmit={upload}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lectureName"
              label="lecture name"
              name="lectureName"
              autoComplete="lectureName"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="url"
              label="Enter Url"
              name="url"
              autoComplete="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={false}
              className="mt-3"
            >
              Upload
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Videos;
