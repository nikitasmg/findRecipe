import { useState } from "react";
import { Languages } from "../types/Languages";

export const useLang = () => {
  const [lang, setLang] = useState<Languages>("ru");

  return { lang, setLang };
};
