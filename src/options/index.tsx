import React from 'react';
import ReactDOM from 'react-dom/client';
import Options from '../pages/Options';

const root = document.getElementById('root');

root &&
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Options />
    </React.StrictMode>,
  );
