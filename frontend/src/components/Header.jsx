import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout, getCurrentUser } from "../services/authService";
import "../styles/header.css";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = getCurrentUser();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="header">
            <div className="header-content">
                <Link to="/" className="logo">Winx App</Link>
                <nav className="nav-links">
                    <Link
                        to="/"
                        className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                    >
                        Home
                    </Link>
                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className={`nav-link ${location.pathname === "/register" ? "active" : ""}`}
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
}