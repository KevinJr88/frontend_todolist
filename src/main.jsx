import React from 'react';
import ReactDOM from 'react-dom/client';

// import AppRouter from './routes/index';
import './index.css';
// import App from './App';
import Todolist from './pages/to-do-list';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Todolist />
  </React.StrictMode>,
)
