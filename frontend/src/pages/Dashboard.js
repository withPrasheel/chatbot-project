import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import chatIcon from '../chat.svg';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleChatClick = () => {
        navigate('/chat');
    };

    return (
        <div className="d-flex half-half-page">
            <div className="logo-container">
                <img src="../../dashboard-image.png" alt="Care Chat Logo" className="logo" />
            </div>
            <div className="content-container">
                <h1>Welcome to the Chatbot!</h1>
                <p>We are here to help you!</p>
                <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet est in enim posuere, non elementum lorem vulputate. Ut mattis nibh leo, sed interdum diam dictum et. Nulla molestie elit sed hendrerit efficitur. Maecenas venenatis, nisi in feugiat dignissim, velit lorem pretium massa, a porta ante nisl ac lectus. Nullam ac mauris et libero vehicula bibendum. Praesent in ante risus. Phasellus maximus ligula turpis, nec lobortis dui blandit nec. Morbi odio purus, faucibus id interdum ut, gravida vel velit. Curabitur vulputate velit non mi pulvinar, quis fringilla nisi sodales. Maecenas accumsan mi vel dui pharetra, vestibulum ultrices metus consequat. Vivamus convallis sollicitudin ante vitae mollis. Suspendisse luctus rutrum ante, non tristique eros lacinia vitae. In orci libero, imperdiet vitae nisl at, tincidunt mollis diam. Donec a mi sit amet neque accumsan auctor. Quisque metus augue, bibendum at hendrerit vitae, aliquam pharetra mi. Suspendisse potenti.</p>
                <p>Nullam in libero convallis, ornare diam sed, consequat nulla. Praesent semper sapien arcu, a bibendum nulla vestibulum quis. Nulla non pellentesque neque. Sed vel nulla egestas, pellentesque dolor sit amet, hendrerit nisi. Aenean quis interdum felis. Mauris eros est, volutpat id ex a, porta interdum nunc. Donec luctus elit a urna porttitor mattis.</p>
                <Button
                    variant="primary"
                    className="align-items-center button-container"
                    onClick={handleChatClick}
                >
                    <img src={chatIcon} alt="Chat Icon" className="chat-icon" />
                    Chat with us!
                </Button>
            </div>
        </div>
    );
};

export default Dashboard;
