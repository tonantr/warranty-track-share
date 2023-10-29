import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FamilySignup() {
    const [name, setName] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:5555/familysignup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Successful') {
                    navigate(`/usersignup?family_id=${data.family_id}&family_name=${data.family_name}`);
                } else {
                    setResponseMessage(data.message);
                }
            })
            .catch((error) => {
                setResponseMessage('Error during registration')
                console.log(error)
            });
    };

    return (
        <div className="container">
            <div className="back-link-container">
                <a href="/" className="custom-back-link"><span>Back</span></a>
            </div>
            <br />
            <h1>Signup</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Family Name:</label>
                <br/>
                <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input-field"
                />
                <br/><br/>
                <div className="button-container">
                    <button type="submit" className="custom-button">Sign Up</button>
                </div>
            </form>

            <br/>
            <div className="response-message">
                {responseMessage}
            </div>

        </div>
    )
}

export default FamilySignup