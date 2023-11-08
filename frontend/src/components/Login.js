import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import config from "./Config";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${config.apiUrl}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Successful') {
                    navigate("/dashboard");
                } else {
                    setResponseMessage(data.message);
                }
            })
            .catch((error) => {
                setResponseMessage('Error during login.')
                console.error(error)
            });
    };
    return (
        <div className="container">
            <div className="back-link-container">
                <a href="/" className="custom-back-link"><span>Back</span></a>
            </div>
            <br />
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <br />
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="input-field"
                />
                <br />
                <label htmlFor="password">Password:</label>
                <br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-field"
                />
                <br /><br />
                <div className="button-container">
                    <button type="submit" className="custom-button">Login</button>
                </div>
            </form>

            <br />
            <div className="response-message">
                {responseMessage}
            </div>
           
        </div>
    );

}

export default Login;