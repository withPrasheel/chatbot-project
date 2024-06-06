import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Context = createContext();

export const useChat = () => {
    return useContext(Context);
};

export const Provider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        if (token && username) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 > Date.now()) {
                    return { username };
                } else {
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                }
            } catch (error) {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
            }
        }
        return null;
    });
    const [conversations, setConversations] = useState([]);

    // Function to fetch data on page load
    const fetchInitialData = async () => {
        if (user && user.username) {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(process.env.REACT_APP_DEV_LINK + 'chat/retrieve/' + user.username, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                });
                setConversations(res.data.conversation);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        }
    };

    useEffect(() => {
        fetchInitialData(); // Fetch initial data on page load
    }, [user]); // Add user as a dependency

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            let userMessage = message;
            setMessage('');
            setConversations(prevConversations => [...prevConversations, { message, isUserMessage: true }]);
            const res = await axios.post(process.env.REACT_APP_DEV_LINK + 'chat/prompt', {
                message: userMessage,
                username: user.username,
            }, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setConversations(prevConversations => [...prevConversations, { message: res.data.response.message.content, isUserMessage: false }]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Context.Provider value={{ message, setMessage, user, setUser, conversations, handleSubmit }}>
            {children}
        </Context.Provider>
    );
};
