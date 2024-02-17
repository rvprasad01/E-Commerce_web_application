import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function LoginPage({ setauth }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setLoading(true);

            const response = await fetch('http://localhost/pro1/loginpm.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();

                console.log('Login response:', data);

                if (data.status === 'success') {
                    console.log('Login successful');
                    setError('');
                    setPassword('');
                    setauth(true);

                    // Store login flag in localStorage
                    localStorage.setItem('isLoggedIn', 'true');
                    navigate('/');

                    // Add the beforeunload event listener after successful login
                    const handleBeforeUnload = (event) => {
                        const message = 'Are you sure you want to leave? Your login will be lost.';
                        event.returnValue = message; // Standard for most browsers
                        return message; // For some older browsers
                    };

                    window.addEventListener('beforeunload', handleBeforeUnload);

                    // Remove the event listener when the component unmounts
                    return () => {
                        window.removeEventListener('beforeunload', handleBeforeUnload);
                    };
                } else {
                    setError(data.message);
                    console.error('Login failed:', data.message);
                }
            } else {
                console.error('Unexpected response format:', contentType);
            }
        } catch (error) {
            console.error('Error during login:', error);
        } finally {
            setLoading(false);
        }
    };

    // Add this useEffect to display a warning when the user tries to refresh the page
    useEffect(() => {
        const handleUnload = (event) => {
            const isLoggedIn = localStorage.getItem('isLoggedIn');

            if (isLoggedIn) {
                const message = 'You need to login again after refreshing the page.';
                event.returnValue = message;
                return message;
            }
        };

        window.addEventListener('beforeunload', handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleAdminLoginClick = () => {
        navigate('/adminlogin');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#007BFF' }}>Login</h2>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '400px',
                    padding: '30px',
                    border: '1px solid #007BFF',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    background: 'white',
                }}
            >
                <div className="mb-3">
                    <label htmlFor="username" className="form-label" style={{ color: '#007BFF' }}>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        style={{ marginBottom: '15px' }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="inputPassword5" className="form-label" style={{ color: '#007BFF' }}>
                        Password
                    </label>
                    <div className="input-group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="inputPassword5"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter your password"
                            style={{ marginBottom: '15px' }}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={togglePasswordVisibility}
                            style={{ cursor: 'pointer', height: '38px' }}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} style={{ fontSize: '18px' }} />
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || !username || !password}
                    style={{
                        padding: '12px',
                        borderRadius: '5px',
                        background: '#007BFF',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                    }}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <div className="col-12" style={{ marginTop: '20px' }}>
                    <p className="small mb-3" style={{ color: '#007BFF' }}>
                        Don't have an account? <a href="/Signup" style={{ color: '#007BFF', textDecoration: 'underline' }}>Create an account</a>
                    </p>
                </div>

                <button type="button" className="btn btn-outline-secondary" onClick={handleAdminLoginClick}>Admin Login</button>

                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            </form>
        </div>
    );
}

export default LoginPage;
