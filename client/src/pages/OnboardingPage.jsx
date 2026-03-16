import { Link } from 'react-router-dom';

export default function OnboardingPage() {
  return (
    <section className="onboard-shell">
      <div className="onboard-left">
        <span className="badge">GLOBAL COVERAGE</span>
        <h1>Stay ahead with the most relevant stories.</h1>
        <p>Curated from trusted global sources and summarized by AI in real-time for you.</p>
      </div>

      <div className="onboard-right">
        <div className="logo-row">
          <div className="logo-icon">📰</div>
          <strong>IT Trends News</strong>
        </div>

        <h2>Your News, Personalized</h2>
        <p>Follow topics and sources from around the world to tailor your feed.</p>

        <div className="auth-actions">
          <Link className="button secondary" to="/login">Sign in</Link>
          <Link className="button" to="/signup">Create account</Link>
        </div>
      </div>
    </section>
  );
}
