import React, { useState } from 'react';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        family_id: '',
        responseMessage: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:5555/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                setFormData({ ...formData, responseMessage: data.message });
            })
            .catch((error) => {
                setFormData({ ...formData, responseMessage: 'Error during registration.' });
                console.error('Error during registration:', error);
            });
    };

    return (
        <div className='signup-container'>
            <h1>Sign Up</h1>
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

                <label htmlFor="family_id">Family ID:</label>
                <br />
                <input
                    type="number"
                    id="family_id"
                    name="family_id"
                    value={formData.family_id}
                    onChange={(e) => setFormData({ ...formData, family_id: e.target.value })}
                    required
                    className='input-field'
                />
                <br /> <br />
                <div className='button-container'>
                    <button type="submit" className='custom-button'>Sign Up</button>
                </div>
            </form>

            <br />
            <div className='response-message' style={{color: 'red'}}>
                {formData.responseMessage}
            </div>

            <br />
            <a href="/" className="custom-back-link"><span>Back</span></a>
        </div>
    );
}

export default Signup;
