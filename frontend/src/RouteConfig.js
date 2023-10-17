import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

function RouteConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouteConfig;