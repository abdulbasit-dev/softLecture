import React, { useContext, useState } from 'react';
import firebase from 'firebase';

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
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SettingsIcon from '@material-ui/icons/Settings';
import { LectureContext } from '../LectureConetxt';
import { useStyles, getModalStyle } from '../assets/styles';
import { db, storage } from '../firebase';
import { useParams } from 'react-router-dom';
import CircularProgressWithLabel from './CircularProgressWithLabel';

function LectureItem({ item, index }) {
  const [state] = useContext(LectureContext);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [file, setFile] = useState(null);
  const [order, setOrder] = useState(item.lecture.order);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [lectureType, setLectureType] = useState(item.lecture.type);
  const { stage, id } = useParams();

  // modal
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  function deleteLecture(lecId) {
    //delete in storege
    storage.ref(`lecture/${item.lecture.name}`).delete();
    //delete in firestore
    db.collection(`stage${stage[0]}`)
      .doc(id.split('_')[1])
      .collection('lectures')
      .doc(lecId)
      .delete()
      .then(() => setOpen(false));
  }

  const types = ['pdf', 'ppt', 'pptx'];

  function handleChange(e) {
    let selected = e.target.files[0];
    const ext = selected.name.split('.')[1];

    //only update the state when we have files selcted
    //check if we have files and valid  types
    if (selected && types.includes(ext)) {
      if (selected.size <= 20000000) {
        setFile(e.target.files[0]);
        setError(null);
      } else {
        setFile(null);
        setError('Pleas select a file with size 20mb or less');
      }
    } else {
      setFile(null);
      setError('Please select an image file (pdf or ppt or pptx)');
    }
  }

  const edit = (e) => {
    e.preventDefault();
    if (order && lectureType) {
      //get a reffrece for where the file should save in firebase
      if (file) {
        //delete old one in storage
        storage.ref(`lecture/${item.lecture.name}`).delete();

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
              .doc(item.id)
              .set(
                {
                  url,
                  order,
                  type: lectureType,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  name: file.name,
                },
                { merge: true },
              );

            setProgress(0);
            setFile(null);
            setOpenEdit(false);
          },
        );
      } else {
        db.collection(`stage${stage[0]}`)
          .doc(id.split('_')[1])
          .collection('lectures')
          .doc(item.id)
          .set(
            {
              order,
              type: lectureType,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true },
          );

        setOpenEdit(false);
      }
    } else {
      alert('please fill order and lecture type feild');
    }
  };

  return (
    <tr>
      <td className="px-6 py-0.1 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {item.lecture.order}
        </div>
      </td>
      <td className="px-6 py-0.1 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {item.lecture.name}
        </div>
      </td>
      <td className="px-6 py-0.1 whitespace-nowrap">
        <div className="text-sm font-medium text-indigo-600 capitalize">
          {item.lecture.type}
        </div>
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
      {state.user && (
        <td className="px-6 pl-3 py-0.1 whitespace-nowrap text-right text-sm font-medium flex justify-center ">
          <IconButton
            aria-label="edit"
            color="primary"
            className="focus:outline-none focus:border-none "
            onClick={() => setOpenEdit(true)}
          >
            <SettingsIcon fontSize="large" />
          </IconButton>
          <IconButton
            aria-label="edit"
            color="secondary"
            className="focus:outline-none focus:border-none "
            onClick={() => setOpen(true)}
          >
            <DeleteIcon fontSize="large" />
          </IconButton>
        </td>
      )}

      {/* confirm delete  */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <div className="my-2">
            <h2 className="text-xl text-gray-600 mb-2">
              Are you sure you went to delete this lecture?
            </h2>
          </div>
          <div className="flex justify-end mt-6">
            <div className="mr-3">
              <Button
                variant="outlined"
                color="secondary"
                className="focus:outline-none"
                onClick={() => deleteLecture(item.id)}
              >
                Delete lecture
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                className="focus:outline-none"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      {/* confirm delete  */}
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <div style={modalStyle} className={classes.paper}>
          <div className="my-2">
            <h2 className="text-xl text-gray-600 mb-2">
              Edit{' '}
              <span className="text-indigo-600 font-medium ">
                "{item.lecture.name}"
              </span>{' '}
            </h2>
            <p className="text-green-600 text-sm">
              please select the file with size less than 20mb , and type of
              (pdf, ppt, pptx)
            </p>
          </div>

          <div className="mt-8">
            <div className="flex">
              <form className="border-separate" onSubmit={edit}>
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
                    onChange={(e) => setOrder(e.target.value)}
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
                  className="focus:outline-none mt-3"
                >
                  Edit Lecture
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
    </tr>
  );
}

export default LectureItem;
