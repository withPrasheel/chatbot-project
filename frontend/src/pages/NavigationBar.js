import React, { useEffect } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useChat } from './Context';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const { user, setUser } = useChat();
    const navigate = useNavigate();

    const username = user?.username || localStorage.getItem('username');

    useEffect(() => {
        if (!username) {
            navigate('/');
        }
    }, [username, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    return (
        <Navbar className='custom-navbar'>
            <Container>
                <a className="navbar-brand" href="/dashboard">
                    <img src="../../care-chat-logo.png" alt="Care Chat Logo" width="100" height="40" />
                </a>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="me-3">
                        Signed in as: <a href="#login" className="navbar-link">{username}</a>
                    </Navbar.Text>
                    <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
