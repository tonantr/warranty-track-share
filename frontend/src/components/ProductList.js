import React, { useState, useEffect } from "react";

import DataTable from "./DataTable";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleAdd = () => {
        console.log('Add button clicked');
    };

    const handleEdit = () => {
        // if (selectedRow) {
        //     console.log('Edit button clicked for item:', selectedRow);
        // }
    };

    const handleDelete = () => {
        // if (selectedRow) {
        //     const selectedItemId = selectedRow.id
        //     console.log('Deleting item with ID:', selectedItemId);
        // }
    };

    useEffect(() => {
        fetch('http://127.0.0.1:5555/productlist')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.products)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })

    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="container">
            <h1>Product List</h1>

            <DataTable data={products} />

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

            <br />
            <div className='button-container'>
                <button className='custom-button' onClick={handleAdd}>Add</button>
                <button className='custom-button' onClick={handleDelete}>Delete</button>
                <button className='custom-button' onClick={handleEdit}>Edit</button>
            </div>

        </div>
    );
}

export default ProductList