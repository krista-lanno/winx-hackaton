import React, { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import GoogleLogo from "../components/GoogleLogo";
import "../styles/auth.css";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await register({ email, password });
            alert("Registration successful! You can now log in.");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Create Account</h2>
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
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

                <div style={{ textAlign: 'center', margin: '1rem 0', color: '#999' }}>OR</div>

                <button
                    type="button"
                    className="google-btn"
                    onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
                >
                    <GoogleLogo />
                    Sign up with Google
                </button>

                <p className="auth-link">
                    Already have an account? <Link to="/login">Sign in here</Link>
                </p>
            </form>
        </div>
    );
}