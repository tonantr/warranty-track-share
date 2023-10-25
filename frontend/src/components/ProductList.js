import React, { useState, useEffect } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function ProductList() {
    // const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gridOptions, setGridOptions] = useState({
        columnDefs: [
            { headerName: 'ID', field: 'id' },
            { headerName: 'Name', field: 'name' },
            { headerName: 'Brand', field: 'brand' },
            { headerName: 'Model', field: 'model' },
            { headerName: 'Serial Number', field: 'serial_number' },
            { headerName: 'Purchase Date', field: 'purchase_date' },
            { headerName: 'Warranty Expiration Date', field: 'warranty_expiration_date' },
        ],
        rowData: [],
    });

    useEffect(() => {
        // fetch('http://127.0.0.1:5555/productlist')
        //    .then((response) => response.json())
        //    .then((data) => setProducts(data.products))
        //    .catch((error) => console.log(error))

        fetch('http://127.0.0.1:5555/productlist')
            .then((response) => response.json())
            .then((data) => {
                // Update grid options with the fetched data
                setGridOptions({
                    ...gridOptions,
                    rowData: data.products,
                });
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            });

    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="container">
            <h1>Product List</h1>
        
            {/* <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <div><strong>Name:</strong> {product.name}</div>
                        <div><strong>Brand:</strong> {product.brand}</div>
                        <div><strong>Model:</strong> {product.model}</div>
                        <div><strong>Serial Number:</strong> {product.serial_number || 'N/A'}</div>
                        <div><strong>Purchase Date:</strong> {product.purchase_date}</div>
                        <div><strong>Warranty Expiration Date:</strong> {product.warranty_expiration_date}</div>
                    </li>
                ))}
            </ul> */}

            <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                <AgGridReact
                    gridOptions={gridOptions}
                />
            </div>

        </div>
    );
}

export default ProductList