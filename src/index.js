import React from 'react';
import ReactDOM from 'react-dom';
import LectureProvider from './LectureConetxt';
import App from './App';
import './index.css';
import './assets/main.css';
import './assets/bootstrap-grid.css';

ReactDOM.render(
  <React.StrictMode>
    <LectureProvider>
      <App />
    </LectureProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
