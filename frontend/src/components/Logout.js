import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate()
    const handleLogout = () => {
        navigate('/login')
    }

    return (
        // <button onClick={handleLogout}>Logout</button>
        <a href="#" onClick={handleLogout} className="logout-button"><span>Logout</span></a>
    );

}

export default Logout