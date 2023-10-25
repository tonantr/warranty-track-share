import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate()
    const handleLogout = () => {
        navigate('/login')
    }

    return (
        <div className="right-aligned-container">
            <a href="#" onClick={handleLogout} className="logout-button">
                <span>Logout</span>
            </a>
        </div>
    );

}

export default Logout