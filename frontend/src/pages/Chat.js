import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../chat.css';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const res = await axios.get(process.env.DEV_LINK + '/chat/conversations', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setConversations(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchConversations();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/conversations', { message }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setConversations([...conversations, res.data]);
            setMessage('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                {conversations.map((conv, index) => (
                    <div key={index} className="message-container">
                        <p className="user-message"><strong>You:</strong> {conv.message}</p>
                        <p className="bot-message"><strong>Bot:</strong> {conv.response}</p>
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
