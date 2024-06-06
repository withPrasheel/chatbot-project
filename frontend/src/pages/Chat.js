import React from 'react';
import { useChat } from './Context';
import '../chat.css';

const Chat = () => {
    const { message, setMessage, conversations, handleSubmit } = useChat();

    return (
        <div className="chat-container">
            <div className="chat-box">
                {conversations.map((conv, index) => (
                    <div key={index} className="message-container">
                        <p className={conv.isUserMessage ? "user-message" : "bot-message"}>
                            <strong>{conv.isUserMessage ? "You" : "Bot"}</strong> {conv.message}
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

