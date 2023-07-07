import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Localize = () => {
  const [translations, setTranslations] = useState<any>({});

  useEffect(() => {
    let language = window.navigator.language;


    switch (language) {
      case 'fr':
        language = 'fr_FR';
        break;
      case 'fr-FR':
        language = 'fr_FR';
        break;
      case 'es':
        language = 'es_ES';
        break;
      case 'es-ES':
        language = 'es_ES';
        break;
      case 'ja':
        language = 'ja_JP';
        break;
      case 'ja-JP':
        language = 'ja_JP';
        break;
      default:
        language = 'en_US';
        break;
    }

    const getTranslations = async () => {
      const response = await fetch(
        `https://cdn.simplelocalize.io/9543c8c2e15a41bfb022955f49c0aab8/_latest/${language}`
      );
      const data = await response.json();
      setTranslations(data);
    };

    getTranslations();
  }, []);

  const translate = (key: string) => {

    return translations[key] || key;
  };

  return {
    translate,
  };
};


export default Localize;