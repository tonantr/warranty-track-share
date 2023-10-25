import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Logout from './Logout';

function Dashboard() {
  return (
    <div className="dashboard">
      <br />
      <Logout />
      <br />
      <ProductList />
    </div>
  );
}

export default Dashboard;
