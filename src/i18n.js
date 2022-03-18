import i18n from "i18next";
import { locizePlugin } from 'locize';
import { initReactI18next } from "react-i18next";
import Backend from "i18next-locize-backend";
import locizeLastUsed from 'locize-lastused';

 const isProduction = false;

const locizeOptions = {
  // the id of your locize project
  projectId: process.env.REACT_APP_LOCIZE_PROJECT_ID,
  // add an api key if you want to send missing keys
  apiKey: process.env.REACT_APP_LOCIZE_API_KEY,
  // the reference language of your project
  referenceLng: process.env.REACT_APP_REFERENCE_LANGUAGE,
  // version - defaults to latest
  version: process.env.REACT_APP_VERSION,
    // hostnames that are allowed to send last used data
  // please keep those to your local system, staging, test servers (not production)
  allowedHosts: ['localhost']
}

if (!isProduction) {
  i18n.use(locizeLastUsed);
}

i18n
.use(locizePlugin)
  // i18next-locize-backend
  // loads translations from your project, saves new keys to it (saveMissing: true)
  // https://github.com/locize/i18next-locize-backend
 .use(Backend)
   // pass the i18n instance to react-i18next.
 .use(initReactI18next)
 .init({
  debug: true,
  fallbackLng: 'fr',
  saveMissing: true,
  backend: locizeOptions,
  locizeLastUsed: locizeOptions,
  react: {
    bindI18n: 'languageChanged editorSaved'
  }
});
 
 export default i18n;
