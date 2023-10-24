import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <div className="product-list">
      <h2>Your Family's Warranty Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} by {product.brand} ({product.model})
            <br />
            Purchase Date: {product.purchase_date}
            <br />
            Warranty Expiration Date: {product.warranty_expiration_date}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureList() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <div className="feature-list">
      <h2>Your Family's Features</h2>
      <ul>
        {features.map((feature) => (
          <li key={feature.id}>
            {feature.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dashboard">
      <ProductList />
      <FeatureList />
    </div>
  );
}

export default Dashboard;
