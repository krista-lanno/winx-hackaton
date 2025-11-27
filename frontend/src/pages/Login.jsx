import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import GoogleLogo from "../components/GoogleLogo";
import "../styles/auth.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login({ email, password });
            navigate("/");
        } catch (err) {
            setError("Login failed. Please check your credentials and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Welcome Back</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="form-input"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="form-input"
                        required
                        disabled={loading}
                    />
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Signing In..." : "Sign In"}
                </button>

                <div style={{ textAlign: 'center', margin: '1rem 0', color: '#999' }}>OR</div>

                <button
                    type="button"
                    className="google-btn"
                    onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
                >
                    <GoogleLogo />
                    Sign in with Google
                </button>

                <p className="auth-link">
                    Don't have an account? <Link to="/register">Create one here</Link>
                </p>
            </form>
        </div>
    );
}