import React, { useState } from "react";

function DataTable({ data, onDelete, onUpdate }) {
    const [editableRowId, setEditableRowId] = useState(null);

    const handleUpdateClick = (item) => {
        setEditableRowId(item.id);
    };

    const handleSaveClick = (updatedItem) => {
        onUpdate(updatedItem);
        setEditableRowId(null);
    };

    const handleCancelClick = () => {
        setEditableRowId(null);
    };

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
                        <td>
                            {editableRowId === item.id ? (
                                <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => onUpdate({ ...item, name: e.target.value })}
                                />
                            ) : (
                                item.name
                            )}
                        </td>
                        <td>
                            {editableRowId === item.id ? (
                                <input
                                    type="text"
                                    value={item.brand}
                                    onChange={(e) => onUpdate({ ...item, brand: e.target.value })}
                                />
                            ) : (
                                item.brand
                            )}
                        </td>
                        <td>{item.model}</td>
                        <td>{item.serial_number}</td>
                        <td>{item.purchase_date}</td>
                        <td>{item.warranty_expiration_date}</td>
                        <td>
                            {editableRowId === item.id ? (
                                <>
                                    <button className="custom-upddel-button"  onClick={() => handleSaveClick(item)}>Save</button>
                                    <button className="custom-upddel-button"  onClick={handleCancelClick}>Cancel</button>
                                </>
                            ) : (
                                <button className="custom-upddel-button"  onClick={() => handleUpdateClick(item)}>Edit</button>
                            )}
                            <button className="custom-upddel-button"  onClick={() => onDelete(item)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DataTable;
