import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    const result = await api.forgotPassword({ email });
    setMessage(result.message);
  };

  return (
    <section className="auth-page dark-auth">
      <div className="auth-card">
      <h1>Forgot Password?</h1>
      <p className="subtitle">Enter your email and we will send a reset link.</p>
      <form className="auth-form" onSubmit={onSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button className="button" type="submit">Send reset link</button>
      </form>
      {message ? <p>{message}</p> : null}
      <div className="auth-links">
        <Link to="/login">Back to login</Link>
      </div>
      </div>
    </section>
  );
}
