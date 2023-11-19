import React from "react";
import { useNavigate } from "react-router-dom";

import config from "./Config";

function Logout() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                navigate('/login')
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