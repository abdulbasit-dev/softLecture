import React from 'react';
import './assets/main.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LectureProvider from './LectureConetxt';

ReactDOM.render(
  <React.StrictMode>
    <LectureProvider>
      <App />
    </LectureProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
