import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import "../styles/home.css";

export default function Home() {
    const user = getCurrentUser();

    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">Welcome to win+x platform!</h1>
                <p className="hero-subtitle">
                    siin on mingi väga tähtis lause, mis seletab, miks see platvorm on parim
                </p>
                <div className="cta-buttons">
                    {!user ? (
                        <>
                            <Link to="/register" className="cta-btn primary">
                                Register
                            </Link>
                            <Link to="/login" className="cta-btn secondary">
                                Sign In
                            </Link>
                        </>
                    ) : (
                        <Link to="/dashboard" className="cta-btn primary">
                            Go to Dashboard
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}