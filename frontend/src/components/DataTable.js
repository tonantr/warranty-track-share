import React from "react";

function DataTable({ data, onDelete, onUpdate }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Serial Number</th>
                    <th>Purchase Date</th>
                    <th>Warranty Expiration Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.brand}</td>
                        <td>{item.model}</td>
                        <td>{item.serial_number}</td>
                        <td>{item.purchase_date}</td>
                        <td>{item.warranty_expiration_date}</td>
                        <td>
                            <button className="custom-update-button" onClick={() => onUpdate(item)}>Update</button>
                            <button className="custom-delete-button" onClick={() => onDelete(item)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default DataTable