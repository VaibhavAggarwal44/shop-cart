import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAphO82-w7czf2NtSx3dQFt0v_KNlYgf9g",
  authDomain: "cart-72270.firebaseapp.com",
  projectId: "cart-72270",
  storageBucket: "cart-72270.appspot.com",
  messagingSenderId: "122216319219",
  appId: "1:122216319219:web:63d73195fb0493f621cf86"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


