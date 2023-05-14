import React, { useState } from "react";
import Localize from "./translationProvider";

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en_US"
  );
  const { translate } = Localize();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
  };

  return (
    <div>
      <label htmlFor="language-select">{translate("LanguageSwitcher.Title")}</label>
      <select id="language-select" onChange={handleChange} value={language}>
        <option value="fr_FR">{translate("LanguageSwitcher.fr_FR")}</option>
        <option value="en_US">{translate("LanguageSwitcher.en_US")}</option>
        <option value="es_ES">{translate("LanguageSwitcher.es_ES")}</option>
        <option value="ja_JP">{translate("LanguageSwitcher.ja_JP")}</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
