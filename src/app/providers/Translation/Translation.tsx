import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "~shared/i18n/en.json";
import translationRU from "~shared/i18n/ru.json";

const resources = {
  en: {
    translation: translationEN
  },
  ru: {
    translation: translationRU
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru"
});

export default i18n;
