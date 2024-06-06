import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { useChat } from './Context';
import '../App.css';

const NavigationBar = ({ onLogout }) => {
    const { user } = useChat();

    return (
        <Navbar className='custom-navbar'>
            <Container>
                <a className="navbar-brand" href="/dashboard">
                    <img src="../../care-chat-logo.png" alt="Care Chat Logo" width="100" height="40" />
                </a>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login" className="navbar-link">{user.username}</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
