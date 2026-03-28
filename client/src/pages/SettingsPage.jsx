import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getLanguageCopy, settingsCopy } from "../localization/copy";
import { useAppContext } from "../state/AppContext";
import { api } from "../services/api";

export default function SettingsPage() {
  const {
    user,
    setUser,
    language: appLanguage,
    setLanguage: setAppLanguage,
    theme: appTheme,
    toggleTheme,
  } = useAppContext();

  const text = getLanguageCopy(settingsCopy, appLanguage);
  const [searchParams] = useSearchParams();

  const loadLocalSettings = () => {
    try {
      return (
        JSON.parse(localStorage.getItem("localSettings")) || {
          compactView: false,
          breakingNewsAlerts: true,
          digestFrequency: "Daily",
          profileVisibility: "Public",
          twoFactorEnabled: false,
        }
      );
    } catch {
      return {
        compactView: false,
        breakingNewsAlerts: true,
        digestFrequency: "Daily",
        profileVisibility: "Public",
        twoFactorEnabled: false,
      };
    }
  };

  const saveLocalSettings = (obj) =>
    localStorage.setItem("localSettings", JSON.stringify(obj));

  const [settings, setSettings] = useState({
    theme: "light",
    language: "en",
    ...loadLocalSettings(),
  });

  const [draft, setDraft] = useState(settings);
  const [loading, setLoading] = useState(true);
  const [savedMessage, setSavedMessage] = useState("");

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const forced = (searchParams.get("state") || "").toLowerCase();

    if (forced === "loading") {
      setLoading(true);
      return;
    }

    api.getSettings().then((data) => {
      const backend =
        forced === "empty"
          ? { theme: "light", language: "en" }
          : data.settings;

      const local = loadLocalSettings();

      const merged = { ...backend, ...local };

      setSettings(merged);
      setDraft(merged);
      setLoading(false);
    });
  }, [searchParams]);

  useEffect(() => {
    setDraft((prev) => ({
      ...prev,
      theme: appTheme,
      language: appLanguage,
    }));
  }, [appTheme, appLanguage]);

  const saveAll = async (e) => {
    e.preventDefault();

    const result = await api.updateSettings({
      theme: draft.theme,
      language: draft.language,
    });

    saveLocalSettings({
      compactView: draft.compactView,
      breakingNewsAlerts: draft.breakingNewsAlerts,
      digestFrequency: draft.digestFrequency,
      profileVisibility: draft.profileVisibility,
      twoFactorEnabled: draft.twoFactorEnabled,
    });

    const merged = { ...result.settings, ...loadLocalSettings() };
    setSettings(merged);
    setDraft(merged);

    if (draft.language !== appLanguage) setAppLanguage(draft.language);
    if (draft.theme !== appTheme) toggleTheme();

    setSavedMessage(text.saved);
    setTimeout(() => setSavedMessage(""), 1500);
  };

  const discardChanges = () => {
    setDraft(settings);
  };

  const submitEmailChange = async () => {
    if (!newEmail.includes("@") || !newEmail.includes(".")) {
      setEmailError("Voer een geldig e-mailadres in.");
      return;
    }

    const result = await api.changeEmail({
      userId: user?.id,
      newEmail,
    });

    if (result.error) {
      setEmailError(result.data?.message || "Er ging iets mis.");
      return;
    }

    setUser((prev) => ({ ...prev, email: result.email }));
    setDraft((prev) => ({ ...prev, email: result.email }));
    setSettings((prev) => ({ ...prev, email: result.email }));

    setShowEmailModal(false);
    setNewEmail("");
    setEmailError("");

    setSavedMessage("E-mailadres succesvol gewijzigd!");
    setTimeout(() => setSavedMessage(""), 1800);
  };

  if (loading) {
    return (
      <section className="page-panel">
        <div className="loading-box">{text.loading}</div>
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

        <form className="settings-form" onSubmit={saveAll}>

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
                    checked={draft.theme === "dark"}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        theme: e.target.checked ? "dark" : "light",
                      }))
                    }
                  />
                  <span className="slider"></span>
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
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        compactView: e.target.checked,
                      }))
                    }
                  />
                  <span className="slider"></span>
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
                <select
                  value={draft.language}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      language: e.target.value,
                    }))
                  }
                >
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
                  <p className="settings-row-sub">{user?.email}</p>
                </div>

                <button
                  type="button"
                  className="link-btn"
                  onClick={() => setShowEmailModal(true)}
                >
                  {text.changeEmail}
                </button>
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
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        breakingNewsAlerts: e.target.checked,
                      }))
                    }
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <label>
                {text.digestFrequency}
                <select
                  value={draft.digestFrequency}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      digestFrequency: e.target.value,
                    }))
                  }
                >
                  <option>Daily</option>
                  <option>Weekly</option>
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
                <select
                  value={draft.profileVisibility}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      profileVisibility: e.target.value,
                    }))
                  }
                >
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
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        twoFactorEnabled: e.target.checked,
                      }))
                    }
                  />
                  <span className="slider"></span>
                </label>
              </div>

            </div>
          </section>

          <div className="settings-actions">
            <button type="button" className="tiny-btn" onClick={discardChanges}>
              {text.discard}
            </button>

            <button type="submit" className="button">
              {text.save}
            </button>
          </div>

          {savedMessage && (
            <p className="settings-saved-msg">{savedMessage}</p>
          )}
        </form>
      </div>

      {showEmailModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "24px",
              width: "380px",
              borderRadius: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <h3 style={{ margin: 0 }}>E-mailadres wijzigen</h3>

            <input
              type="email"
              placeholder="Nieuw e-mailadres"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                width: "100%",
              }}
            />

            {emailError && (
              <p style={{ color: "#dc2626", margin: 0 }}>{emailError}</p>
            )}

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "8px",
              }}
            >
              <button
                type="button"
                className="tiny-btn"
                onClick={() => {
                  setShowEmailModal(false);
                  setNewEmail("");
                  setEmailError("");
                }}
              >
                Annuleren
              </button>

              <button
                type="button"
                className="button"
                onClick={submitEmailChange}
              >
                Opslaan
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}