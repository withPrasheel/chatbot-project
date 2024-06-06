import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from './Context';
import { jwtDecode } from 'jwt-decode'; // Correct import
import '../chat.css';

const Chat = () => {
    const { message, setMessage, conversations, handleSubmit } = useChat();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        if (!token || !username) {
            navigate('/');
        } else {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    navigate('/');
                }
            } catch (error) {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                navigate('/');
            }
        }
    }, [navigate]);

    return (
        <div className="chat-container">
            <div className="chat-box">
                {conversations.map((conv, index) => (
                    <div key={index} className="message-container">
                        <p className={conv.isUserMessage ? "user-message" : "bot-message"}>
                            <strong>{conv.isUserMessage ? "You " : "Bot "}</strong> {conv.message}
                        </p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="message-form">
                <input
                    type="text"
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="message-input"
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    );
};

export default Chat;