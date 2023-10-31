import React, { useState, useEffect } from "react";

import DataTable from "./DataTable";
import Pagination from "./Pagination";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = products.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
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

            <DataTable data={currentItems} />

            <br />

            <Pagination 
                itemsPerPage={itemsPerPage}
                totalItems={products.length}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

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
                <button className='custom-button' >Add</button>
                <button className='custom-button' >Delete</button>
                <button className='custom-button' >Edit</button>
            </div>

        </div>
    );
}

export default ProductList