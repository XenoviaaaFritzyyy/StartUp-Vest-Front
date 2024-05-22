import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import Companies from './Components/Companies';
import StartUpView from './VisitorView/startupProfileView';
import FundingRoundView from './VisitorView/fundingRoundView';
import UserView from './VisitorView/userProfileView';
import FundingRound from './Components/FundingRound';
import People from './Components/People';
import CapTable from './Components/CapTable';
import UserDashboard from './Dashboard/UserDashboard';
import AdminDashboard from './Dashboard/AdminDashboard';
import LandingPage from './Components/LandingPage';
import ViewStartupProfile from './Form/ViewStartupProfile';
import ViewInvestorProfile from './Form/ViewInvestorProfile';
import ViewFundingRound from './Form/ViewFundingRound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Components */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/fundinground" element={<FundingRound />} />
        <Route path="/people" element={<People />} />
        <Route path="/captable" element={<CapTable />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />

        {/* Business Profile */}
        <Route path="/startupprofile" element={<ViewStartupProfile />} />
        <Route path="/investorprofile" element={<ViewInvestorProfile />} />

        {/* Visitor View */}
        <Route path="/startupview" element={<StartUpView />} />
        <Route path="/fundingroundview" element={<FundingRoundView />} />
        <Route path="/userview" element={<UserView />} />
        <Route path="/startupprofile" element={<ViewStartupProfile />} />
        <Route path="/investorprofile" element={<ViewInvestorProfile />} />
        <Route path="/fundingprofile" element={<ViewFundingRound />} />
      </Routes>
    </Router>
  );
}

export default App;
