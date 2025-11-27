import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../services/authService";

export default function Header() {
    const navigate = useNavigate();
    const user = getCurrentUser();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header style={{ padding: "10px", background: "#f0f0f0" }}>
            <Link to="/">Home</Link> |{" "}
            {!user ? (
                <>
                    <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                </>
            ) : (
                <button onClick={handleLogout}>Logout</button>
            )}
        </header>
    );
}
