import { useEffect } from 'react';
import { useNavigate, useSearchParams } from
        'react-router-dom';

export default function OAuthCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
            navigate('/');
        }
    }, [searchParams, navigate]);

    return <div>Processing login...</div>;
}
