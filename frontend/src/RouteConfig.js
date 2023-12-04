import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import UserSignup from './components/UserSignup';
import FamilySignup from './components/FamilySignup'
// import FamilySearch from './components/FamilySearch';


function RouteConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/usersignup" element={<UserSignup />} />
      <Route exact path="/familysignup" element={<FamilySignup />} />
      {/* <Route exact path="/familysearch" element={<FamilySearch />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouteConfig;