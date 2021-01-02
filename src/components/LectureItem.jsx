import React, { useContext, useState } from 'react';

import { Button, IconButton, Modal } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { LectureContext } from '../LectureConetxt';
import { useStyles, getModalStyle } from '../assets/styles';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';

function LectureItem({ item, index }) {
  const [state] = useContext(LectureContext);
  const [open, setOpen] = useState(false);
  const { stage, id } = useParams();

  // modal
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  console.log(id.split('_')[1]);
  console.log(stage);

  function deleteLecture(lecId) {
    db.collection(`stage${stage[0]}`)
      .doc(id.split('_')[1])
      .collection('lectures')
      .doc(lecId)
      .delete()
      .then(setOpen(false));
  }

  return (
    <tr>
      <td className="px-6 py-0.1 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{index + 1}</div>
      </td>
      <td className="px-6 py-0.1 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {item.lecture.name}
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
        <td className="px-6 pl-3 py-0.1 whitespace-nowrap text-right text-sm font-medium flex">
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

      <Modal open={open} onClose={() => setOpen(false)}>
        {/* confirm delete  */}

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
                onClick={() => deleteLecture(item.id)}
              >
                Delete lecture
              </Button>
            </div>
            <div>
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </tr>
  );
}

export default LectureItem;
