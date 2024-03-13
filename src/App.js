import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import UserManagement from './components/UserManagement/UserManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;