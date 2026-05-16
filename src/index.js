import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="493744483298-7j0rlbiuo794ks1cnhoua1c1ac80jcm0.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);