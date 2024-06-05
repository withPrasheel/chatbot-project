import React from 'react';
import { Button } from 'react-bootstrap';
import chatIcon from '../chat.svg';

const Dashboard = () => {
    return (
        <div className="d-flex half-half-page">
      <div className="logo-container">
        <img src="../../dashboard-image.png" alt="Care Chat Logo" className="logo" />
      </div>
      <div className="d-flex align-items-center button-container">
        <Button variant="primary" className="chat-button">
          <img src={chatIcon} alt="Chat Icon" className="chat-icon" />
          Chat with us!
        </Button>
        {/* You can add more content here if needed */}
      </div>
    </div>

    );
};

export default Dashboard;