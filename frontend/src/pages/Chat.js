// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../chat.css';

// const Chat = () => {
//     const [message, setMessage] = useState('');
//     const [user, setUser] = useState({ username: 'sanikaaaaa' })
//     const [conversations, setConversations] = useState([]);

//     // Function to fetch data on page load
//     const fetchInitialData = async () => {
//         try {
//             const res = await axios.get(process.env.REACT_APP_DEV_LINK+'chat/retrieve/'+user.username,
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // 'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 },
//             });
//             setConversations(res.data.conversation);
//         } catch (error) {
//             console.error('Error fetching initial data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchInitialData(); // Fetch initial data on page load
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             let userMessage = message;
//             setMessage('');
//             setConversations(prevConversations => [...prevConversations, { message, isUserMessage: true }]);
//             // console.log('conversations', conversations);
//             const res = await axios.post(process.env.REACT_APP_DEV_LINK +'chat/prompt', { 
//                 message: userMessage,
//                 username: user.username,
//              }, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             setConversations(prevConversations => [...prevConversations, { message: res.data.response.message.content, isUserMessage: false }]);                        
            
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div className="chat-container">
//             <div className="chat-box">
//                 {conversations.map((conv, index) => (
//                     <div key={index} className="message-container">
//                         <p className={conv.isUserMessage?"user-message":"bot-message"}><strong>{conv.isUserMessage? "You": "Bot"}</strong> {conv.message}</p>
//                     </div>
//                 ))}
//             </div>
//             <form onSubmit={handleSubmit} className="message-form">
//                 <input
//                     type="text"
//                     placeholder="Type your message"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     required
//                     className="message-input"
//                 />
//                 <button type="submit" className="send-button">Send</button>
//             </form>
//         </div>
//     );
// };

// export default Chat;

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

