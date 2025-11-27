import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function OAuthCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        console.log('OAuth callback - token:', token);

        if (token) {
            localStorage.setItem('token', token);
            console.log('Token saved to localStorage');

            // Give localStorage time to save before navigating
            setTimeout(() => {
                navigate('/', { replace: true });
            }, 100);
        } else {
            console.error('No token found in URL');
            navigate('/login');
        }
    }, [searchParams, navigate]);

    return <div>Processing login...</div>;
}
