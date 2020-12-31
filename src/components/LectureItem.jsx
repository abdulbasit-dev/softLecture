import React, { useContext } from 'react';

import { IconButton } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { LectureContext } from '../LectureConetxt';

function LectureItem({ item, index }) {
  const [state] = useContext(LectureContext);

  function editLecuture() {}

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
            color="primary"
            className="focus:outline-none focus:border-none "
          >
            <EditIcon fontSize="large" />
          </IconButton>
        </td>
      )}
    </tr>
  );
}

export default LectureItem;
