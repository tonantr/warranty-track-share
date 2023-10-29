import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FamilySearch() {
    const [familyname, setFamilyName] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate();

    const searchFamily = () => {
        fetch('http://127.0.0.1:5555/familysearch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: familyname }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Exist') {
                    navigate(`/usersignup?family_id=${data.id}&family_name=${data.name}`)
                } else {
                    setResponseMessage(data.message)
                }
            })
            .catch((error) => {
                setResponseMessage('Error during searching')
                console.log(error);
            })
    }
    return (
        <div className="container">
            <div className="back-link-container">
                <a href="/" className="custom-back-link"><span>Back</span></a>
            </div>
            <br />
            <div>
                <input
                    type="text"
                    id="name"
                    value={familyname}
                    onChange={(e) => setFamilyName(e.target.value)}
                    placeholder="Enter family name"
                    className="input-field"
                />
                <button onClick={searchFamily}>Search</button>
            </div>
            <br/>
            <div className="response-message">
                {responseMessage}
            </div>

        </div>
    );
}

export default FamilySearch