import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.prevenDefault();

        fetch('/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'login successful') {
                    navigate("/dashboard");
                } else {
                    console.log('Invalid username or password' + data.message);
                }
            })
            .catch((error) => {
                console.error(error)
            });
    };
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <br/>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br/>
                <label htmlFor="password">Password:</label>
                <br/>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br/>
                <br/>
                <button type="submit">Login</button>
            </form>
            <br/>
            <a href="/">Back</a>
        </div>
    );

}

export default Login;