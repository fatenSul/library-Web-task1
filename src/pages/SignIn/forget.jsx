import React, { useState } from 'react';
import axios from 'axios';
import './forget.css'
import { toast } from 'react-toastify';

export default function Forget() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      await axios.patch('https://ecommerce-node4-five.vercel.app/auth/sendcode', { email });
      toast('Reset code sent successfully');
    } catch (error) {
      setMessage('Failed to send reset code');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://ecommerce-node4-five.vercel.app/auth/forgotPassword`, {
        email,
        code,
        password:newPassword,
      });
      setMessage('Password reset successfully');
    } catch (error) {
      setMessage('Failed to reset password');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSendCode}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Code</button>
      </form>

      <form onSubmit={handleResetPassword}>
        <input
          type="text"
          placeholder="Reset code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
