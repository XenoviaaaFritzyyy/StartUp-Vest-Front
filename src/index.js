import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import Login from './Components/Login';
// import Signup from './Components/Signup';
// import Profile from './Components/Profile';
// import Companies from './Components/Companies'
// import StartUpView from './VisitorView/startupProfileView';
// import FundingRoundView from './VisitorView/fundingRoundView';
// import UserView from './VisitorView/userProfileView';
// import FundingRound from './Components/FundingRound';
// import People from './Components/People';
// import CapTable from './Components/CapTable';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
