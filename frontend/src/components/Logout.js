import React from "react";
import { useNavigate } from "react-router-dom";

import config from "./Config";

function Logout() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await fetch(`${config.apiUrl}/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                localStorage.removeItem('access_token');
                navigate('/login');
            } else {
                console.error("Logout failed")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="right-aligned-container">
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </div>
    );

}

export default Logout