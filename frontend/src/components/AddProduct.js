import React, { useState } from "react";

function AddProduct({ onAddProduct }) {
    const [dateError, setDateError] = useState("");
    const [newProduct, setNewProduct] = useState({
        name: "",
        brand: "",
        model: "",
        serial_number: "",
        purchase_date: "",
        warranty_expiration_date: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target

        if (name === "purchase_date" || name === "warranty_expiration_date") {
            const datePattern = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/;

            if (!datePattern.test(value)) {
                setDateError("Invalid date format")
            } else {
                setDateError("")
            }
        }

        setNewProduct({
            ...newProduct,
            [name]: value
        })
    };

    const handleAddProduct = () => {
        onAddProduct(newProduct);
    };

    return (
        <div>
            {/* <h2>Add Product</h2> */}
            <hr></hr>
            <br />
            <form>
                <label htmlFor="name">Name:</label>
                <br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className='input-field'
                    value={newProduct.name}
                    onChange={handleInputChange}
                />

                <br />
                <label htmlFor="brand">Brand:</label>
                <br />
                <input
                    type="text"
                    id="brand"
                    name="brand"
                    required
                    className='input-field'
                    value={newProduct.brand}
                    onChange={handleInputChange}
                />

                <br />

                <label htmlFor="model">Model:</label>
                <br />
                <input
                    type="text"
                    id="model"
                    name="model"
                    required
                    className='input-field'
                    value={newProduct.model}
                    onChange={handleInputChange}
                />

                <br />

                <label htmlFor="serial_number">Serial Number:</label>
                <br />
                <input
                    type="text"
                    id="serial_number"
                    name="serial_number"
                    required
                    className='input-field'
                    value={newProduct.serial_number}
                    onChange={handleInputChange}
                />

                <br />

                <label htmlFor="purchase_date">Purchase Date:</label>
                <br />
                <input
                    type="text"
                    id="purchase_date"
                    name="purchase_date"
                    required
                    className='input-field'
                    value={newProduct.purchase_date}
                    onChange={handleInputChange}
                    placeholder="MM-DD-YYYY"
                />

                {dateError && <div className="response-message">{dateError}</div>}

                <br />

                <label htmlFor="warranty_expiration_date">Warranty Expiration Date:</label>
                <br />
                <input
                    type="text"
                    id="warranty_expiration_date"
                    name="warranty_expiration_date"
                    required
                    className='input-field'
                    value={newProduct.warranty_expiration_date}
                    onChange={handleInputChange}
                    placeholder="MM-DD-YYYY"
                />

                {dateError && <div className="response-message">{dateError}</div>}

                <br /> <br />
                <div className='button-container'>
                    <button type="button" onClick={handleAddProduct} className='custom-button'>Add Product</button>
                </div>
            </form>
        </div>
    )

}

export default AddProduct