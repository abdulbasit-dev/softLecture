import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

function BackButton() {
  const history = useHistory();
  return (
    <div className="flex justify-end">
      <Button
        variant="contained"
        className="focus:outline-none"
        color="default"
        startIcon={<ArrowBackIcon />}
        onClick={() => history.goBack()}
      >
        back
      </Button>
    </div>
  );
}

export default BackButton;
