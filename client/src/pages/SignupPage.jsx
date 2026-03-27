import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAppContext } from '../state/AppContext';

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const result = await api.signup({ name, email, password });
      login(result.user);
      navigate('/explore');
    } catch {
      setError('Unable to create account.');
    }
  };

  return (
    <section className="auth-page dark-auth">
      <div className="auth-card">
      <h1>Create Account</h1>
      <p className="subtitle">Create your personalized NewsRoom profile</p>
      <form className="auth-form" onSubmit={onSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error ? <p className="error">{error}</p> : null}
        <button className="button" type="submit">Sign up</button>
      </form>
      <div className="auth-links">
        <Link to="/login">Back to login</Link>
      </div>
      </div>
    </section>
  );
}
