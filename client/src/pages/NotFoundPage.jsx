import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="auth-page">
      <h1>Page not found</h1>
      <Link className="button" to="/onboarding">Go to onboarding</Link>
    </section>
  );
}
