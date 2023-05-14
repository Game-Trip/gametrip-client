import { useEffect, useState } from "react";

interface LocalizeProps {
  language: string;
}

const Localize = () => {
  const [translations, setTranslations] = useState<any>({});
  const [language] = useState(
    localStorage.getItem("language") || "en_US"
  );

  useEffect(() => {
    const getTranslations = async () => {
      const response = await fetch(
        `https://cdn.simplelocalize.io/9543c8c2e15a41bfb022955f49c0aab8/_latest/${language}`
      );
      const data = await response.json();
      setTranslations(data);
    };

    getTranslations();
  }, [language]);

  const translate = (key: string) => {
    
    return translations[key] || key;
  };

  return {
    translate,
  };
};

export default Localize;