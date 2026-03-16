import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    await api.resetPassword({ email, newPassword });
    navigate('/login');
  };

  return (
    <section className="auth-page">
      <div className="auth-card light-auth-card">
      <h1>Set New Password</h1>
      <p className="subtitle">Your new password must be different from previous passwords.</p>
      <form className="auth-form" onSubmit={onSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button className="button" type="submit">Reset password</button>
      </form>
      <div className="auth-links">
        <Link to="/login">Back to login</Link>
      </div>
      </div>
    </section>
  );
}
