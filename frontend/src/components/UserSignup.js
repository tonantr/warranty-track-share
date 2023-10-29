import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function UserSignup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        family_id: ''
    });

    const [responseMessage, setResponseMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const familyId = new URLSearchParams(location.search).get("family_id")
    const familyName = new URLSearchParams(location.search).get("family_name")

    useEffect(() => {
        if (familyId) {
            setFormData((formData) => {
                return { ...formData, family_id: familyId }
            });
        }
    }, [familyId, setFormData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:5555/usersignup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Successful") {
                    navigate("/login");
                } else {
                    setResponseMessage(data.message);
                }
            })
            .catch((error) => {
                setResponseMessage('Error during registration')
                console.log(error);
            });
    };

    return (
        <div className='container'>
            <div className="back-link-container">
                <a href="/" className="custom-back-link"><span>Back</span></a>
            </div>
            <br />
            <h1>User Signup</h1>
            <h3>Family Name: {familyName}</h3>
            <br/>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <br />
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                    className='input-field'
                />

                <br />

                <label htmlFor="email">Email:</label>
                <br />
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className='input-field'
                />

                <br />

                <label htmlFor="password">Password:</label>
                <br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className='input-field'
                />

                <br />

                <label htmlFor="name">Name:</label>
                <br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className='input-field'
                />

                <br />

                <label htmlFor="family_id" style={{display: 'none'}}>Family ID:</label>
                <br />
                <input
                    type="number"
                    id="family_id"
                    name="family_id"
                    value={formData.family_id}
                    onChange={(e) => setFormData({ ...formData, family_id: e.target.value })}
                    required
                    className='input-field'
                    style={{display: 'none'}}
                />

                <br />
                <div className='button-container'>
                    <button type="submit" className='custom-button'>Sign Up</button>
                </div>
            </form>

            <br />
            <div className='response-message'>
                {responseMessage}
            </div>

        </div>
    );
}

export default UserSignup;
