import logo from './payplug.svg';
import React, {useEffect, Suspense} from 'react';
import './App.css';
import { useTranslation } from "react-i18next";

function Page() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = React.useState({ en: { nativeName: 'français, langue française' }});
 
  useEffect(() => {
    console.log('projectId', process.env.REACT_APP_LOCIZE_PROJECT_ID);
    i18n.services.backendConnector.backend.getLanguages((err, ret) => {
      if (err) return // TODO: handle err...
      console.log(ret);
      setLanguage(ret);
    });
  }, [i18n, i18n.services, i18n.services.backendConnector, i18n.services.backendConnector.backend]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {Object.keys(language).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.language === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {language[lng].nativeName}
            </button>
          ))}
        <p>
        {t("welcome", "lol")}
        </p>
        <div>{t('new.key', 'cette clée est nouvelle mais nexiste pas encore sur Locize')}</div>
        <p>{t('lolnewkey', 'Attention la magie, cette clée va être traduite automatiquement')}</p>
      </header>
    </div>
  );
}

// loading component for suspence fallback
const Loader = () => (
  <div className="App">
    <img src={logo} className="App-logo" alt="logo" />
    <div>loading...</div>
  </div>
);

// here app catches the suspense from page in case translations are not yet loaded
export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
}
