import React, { useState, useEffect } from "react";

import DataTable from "./DataTable";
import Pagination from "./Pagination";
import AddProduct from "./AddProduct";
import config from "./Config"

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = products && products.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleAddFormToggle = () => {
        setShowAddForm(!showAddForm)
    };

    const handleAddProduct = (newProduct) => {
        fetch(`${config.apiUrl}/productadd`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.message === "Successful") {
                    newProduct.id = data.id
                    setProducts([...products, newProduct])
                    setShowAddForm(false)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetch(`${config.apiUrl}/productlist`)
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
            <div className="add-link-container">
                <button onClick={handleAddFormToggle} className="custom-add-button">
                    Add
                </button>
            </div>
            <br />
            <h1>Product List</h1>

            <DataTable data={currentItems} />

            <br />

            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={products.length}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

            <br />

            {showAddForm && (
                <div>
                    <AddProduct onAddProduct={handleAddProduct} />
                </div>
            )}

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

        </div>
    );
}

export default ProductList