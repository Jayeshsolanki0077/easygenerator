import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './routes/route';
import Signup from './components/signup/signup'
import Signin from './components/signin/signin'
import Homepage from './components/homepage/homepage'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
  <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Homepage />} />
        </Route>
        <Route path="/login" Component={Signin} />
        <Route path="/signup" Component={Signup} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
