import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import { Provider } from './pages/Context';
import Landing from './pages/Landing';
import Layout from './pages/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
