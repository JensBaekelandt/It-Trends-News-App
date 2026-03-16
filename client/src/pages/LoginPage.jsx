import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAppContext } from '../state/AppContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const result = await api.login({ email, password });
      login(result.user);
      navigate('/explore');
    } catch {
      setError('Sign in failed. Please check your credentials.');
    }
  };

  return (
    <section className="auth-page dark-auth">
      <div className="auth-card">
      <h1>Welcome Back</h1>
      <p className="subtitle">Sign in to your personalized news feed</p>
      <form className="auth-form" onSubmit={onSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error ? <p className="error">{error}</p> : null}
        <button className="button" type="submit">Sign in</button>
      </form>
      <div className="auth-links">
        <Link to="/forgot-password">Forgot Password?</Link>
        <Link to="/signup">Create account</Link>
      </div>
      </div>
    </section>
  );
}
