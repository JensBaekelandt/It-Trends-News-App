import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getLanguageCopy, settingsCopy } from '../localization/copy';
import { api } from '../services/api';
import { useAppContext } from '../state/AppContext';

export default function SettingsPage() {
  const { language: appLanguage, setLanguage: setAppLanguage, theme: appTheme, toggleTheme } = useAppContext();
  const text = getLanguageCopy(settingsCopy, appLanguage);
  const [settings, setSettings] = useState({ theme: 'light', language: 'en' });
  const [draft, setDraft] = useState({
    theme: 'light',
    language: 'en',
    compactView: false,
    breakingNewsAlerts: true,
    digestFrequency: 'Daily',
    profileVisibility: 'Public',
    twoFactorEnabled: false,
  });
  const [savedMessage, setSavedMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const forcedState = (searchParams.get('state') || '').toLowerCase();

    if (forcedState === 'loading') {
      setLoading(true);
      return;
    }

    api.getSettings().then((data) => {
      if (forcedState === 'empty') {
        setSettings({ theme: 'light', language: 'en' });
        setDraft((prev) => ({ ...prev, theme: 'light', language: 'en' }));
      } else {
        setSettings(data.settings);
        setDraft((prev) => ({ ...prev, ...data.settings }));
      }
      setLoading(false);
    });
  }, [searchParams]);

  useEffect(() => {
    setDraft((prev) => ({ ...prev, theme: appTheme, language: appLanguage }));
  }, [appTheme, appLanguage]);

  const save = async (event) => {
    event.preventDefault();
    const updated = await api.updateSettings({ theme: draft.theme, language: draft.language });
    setSettings(updated.settings);
    setDraft((prev) => ({ ...prev, ...updated.settings }));
    if (draft.language !== appLanguage) {
      setAppLanguage(draft.language);
    }
    if (draft.theme !== appTheme) {
      toggleTheme();
    }
    setSavedMessage(text.saved);
    window.setTimeout(() => setSavedMessage(''), 1800);
  };

  const discardChanges = () => {
    setDraft((prev) => ({
      ...prev,
      theme: settings.theme,
      language: settings.language,
    }));
    if (appLanguage !== settings.language) {
      setAppLanguage(settings.language);
    }
    if (appTheme !== settings.theme) {
      toggleTheme();
    }
  };

  if (loading) {
    return <section className="page-panel"><div className="loading-box">{text.loading}</div></section>;
  }

  if ((searchParams.get('state') || '').toLowerCase() === 'empty') {
    return (
      <section className="page-panel">
        <div className="empty-box">
          <h2>{text.emptyTitle}</h2>
          <p>{text.emptyBody}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page-panel">
      <div className="settings-layout">
        <aside className="settings-side">
          <h2>{text.settings}</h2>
          <nav className="settings-nav">
            <a className="settings-nav-link" href="#appearance">{text.appearance}</a>
            <a className="settings-nav-link" href="#language">{text.language}</a>
            <a className="settings-nav-link" href="#account">{text.account}</a>
            <a className="settings-nav-link" href="#notifications">{text.notifications}</a>
            <a className="settings-nav-link" href="#privacy">{text.privacy}</a>
          </nav>
          <div className="settings-side-footer">v4.2.1 Stable</div>
        </aside>

        <form className="settings-form" onSubmit={save}>
          <section className="settings-block" id="appearance">
            <div className="settings-head">
              <h3>{text.appearance}</h3>
              <p>{text.appearanceSub}</p>
            </div>
            <div className="settings-card">
              <div className="settings-row">
                <div>
                  <p className="settings-row-title">{text.darkMode}</p>
                  <p className="settings-row-sub">{text.darkModeDesc}</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={draft.theme === 'dark'}
                    onChange={(event) => setDraft((prev) => ({ ...prev, theme: event.target.checked ? 'dark' : 'light' }))}
                  />
                  <span className="slider" />
                </label>
              </div>
              <div className="settings-row">
                <div>
                  <p className="settings-row-title">{text.compactView}</p>
                  <p className="settings-row-sub">{text.compactViewDesc}</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={draft.compactView}
                    onChange={(event) => setDraft((prev) => ({ ...prev, compactView: event.target.checked }))}
                  />
                  <span className="slider" />
                </label>
              </div>
            </div>
          </section>

          <section className="settings-block" id="language">
            <div className="settings-head">
              <h3>{text.language}</h3>
              <p>{text.languageSub}</p>
            </div>
            <div className="settings-card">
              <label>
                {text.displayLanguage}
                <select value={draft.language} onChange={(e) => setDraft((prev) => ({ ...prev, language: e.target.value }))}>
                  <option value="en">English (United States)</option>
                  <option value="nl">Nederlands (Dutch)</option>
                </select>
              </label>
            </div>
          </section>

          <section className="settings-block" id="account">
            <div className="settings-head">
              <h3>{text.account}</h3>
              <p>{text.accountSub}</p>
            </div>
            <div className="settings-card">
              <div className="settings-row">
                <div>
                  <p className="settings-row-title">{text.emailAddress}</p>
                  <p className="settings-row-sub">alex.walker@newspulse.com</p>
                </div>
                <button className="link-btn" type="button">{text.changeEmail}</button>
              </div>
              <div className="settings-row">
                <div>
                  <p className="settings-row-title">{text.googleAccount}</p>
                  <p className="settings-row-sub">{text.connected}</p>
                </div>
                <button className="tiny-btn" type="button">{text.disconnect}</button>
              </div>
            </div>
          </section>

          <section className="settings-block" id="notifications">
            <div className="settings-head">
              <h3>{text.notifications}</h3>
              <p>{text.notificationsSub}</p>
            </div>
            <div className="settings-card">
              <div className="settings-row">
                <div>
                  <p className="settings-row-title">{text.breakingNews}</p>
                  <p className="settings-row-sub">{text.breakingNewsDesc}</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={draft.breakingNewsAlerts}
                    onChange={(event) => setDraft((prev) => ({ ...prev, breakingNewsAlerts: event.target.checked }))}
                  />
                  <span className="slider" />
                </label>
              </div>
              <label>
                {text.digestFrequency}
                <select value={draft.digestFrequency} onChange={(e) => setDraft((prev) => ({ ...prev, digestFrequency: e.target.value }))}>
                  <option>Daily</option>
                  <option>Never</option>
                </select>
              </label>
            </div>
          </section>

          <section className="settings-block" id="privacy">
            <div className="settings-head">
              <h3>{text.privacy}</h3>
              <p>{text.privacySub}</p>
            </div>
            <div className="settings-card">
              <label>
                {text.profileVisibility}
                <select value={draft.profileVisibility} onChange={(e) => setDraft((prev) => ({ ...prev, profileVisibility: e.target.value }))}>
                  <option>Public</option>
                  <option>Only Me</option>
                </select>
              </label>
              <div className="settings-row">
                <div>
                  <p className="settings-row-title">{text.twoFactor}</p>
                  <p className="settings-row-sub">{text.twoFactorDesc}</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={draft.twoFactorEnabled}
                    onChange={(event) => setDraft((prev) => ({ ...prev, twoFactorEnabled: event.target.checked }))}
                  />
                  <span className="slider" />
                </label>
              </div>
            </div>
          </section>

          <div className="settings-actions">
            <button className="tiny-btn" type="button" onClick={discardChanges}>{text.discard}</button>
            <button className="button" type="submit">{text.save}</button>
          </div>
          {savedMessage ? <p className="settings-saved-msg">{savedMessage}</p> : null}
        </form>
      </div>
    </section>
  );
}
