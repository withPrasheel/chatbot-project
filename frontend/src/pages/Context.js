import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const Context = createContext();

export const useChat = () => {
    return useContext(Context);
};

export const Provider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState({ username: 'sanikaaaaa' });
    const [conversations, setConversations] = useState([]);

    // Function to fetch data on page load
    const fetchInitialData = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_DEV_LINK + 'chat/retrieve/' + user.username, {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            setConversations(res.data.conversation);
        } catch (error) {
            console.error('Error fetching initial data:', error);
        }
    };

    useEffect(() => {
        fetchInitialData(); // Fetch initial data on page load
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let userMessage = message;
            setMessage('');
            setConversations(prevConversations => [...prevConversations, { message, isUserMessage: true }]);
            const res = await axios.post(process.env.REACT_APP_DEV_LINK + 'chat/prompt', {
                message: userMessage,
                username: user.username,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setConversations(prevConversations => [...prevConversations, { message: res.data.response.message.content, isUserMessage: false }]);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Context.Provider value={{ message, setMessage, user, conversations, handleSubmit }}>
            {children}
        </Context.Provider>
    );
};
