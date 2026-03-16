import { NavLink, Outlet } from 'react-router-dom';
import { appLayoutCopy, getLanguageCopy } from '../localization/copy';
import { useAppContext } from '../state/AppContext';

function SidebarLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
      }
    >
      {children}
    </NavLink>
  );
}

export default function AppLayout() {
  const { theme, language, toggleTheme, toggleLanguage } = useAppContext();
  const labels = getLanguageCopy(appLayoutCopy, language);

  return (
    <div className="workspace-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-dot">N</div>
          <div className="brand-text">NewsRoom</div>
        </div>

        <div className="topbar-actions">
          <button className="tiny-btn" type="button" onClick={toggleLanguage}>{language.toUpperCase()} / {language === 'en' ? 'NL' : 'EN'}</button>
          <button className="icon-btn" type="button" onClick={toggleTheme}>
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <div className="avatar-pill">
            <span className="avatar-dot" />
            <span>Alex Rivera</span>
          </div>
        </div>
      </header>

      <div className="app-shell">
        <aside className="sidebar">
          <a className="sidebar-link" href="/Home/Home.html" target="_blank" rel="noreferrer">
            Home (legacy)
          </a>
          <SidebarLink to="/explore">{labels.explore}</SidebarLink>
          <SidebarLink to="/bookmarks">{labels.bookmarks}</SidebarLink>
          <SidebarLink to="/settings">{labels.settings}</SidebarLink>
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
