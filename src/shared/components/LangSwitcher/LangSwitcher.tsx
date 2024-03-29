import { Box, Button } from "@mui/material";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useLang } from "~/shared/hooks/useLang";
import { Languages } from "~/shared/types/Languages";

type Props = {
  onLangChange?: (lang: Languages) => void;
};

export const LangSwitcher: React.FC<Props> = ({ onLangChange }) => {
  const { lang, setLang } = useLang();

  const activeClassName = "bg-primary text-white hover:bg-primary-dark";

  const buttonClassName = "rounded-none h-[48px]";

  const getClickHandler = (newLang: Languages) => () => {
    setLang(newLang);
  };

  useEffect(() => {
    onLangChange?.(lang);
  }, [onLangChange, lang]);

  return (
    <Box className='flex border border-primary rounded-lg overflow-hidden min-w-[130px]'>
      <Button
        className={clsx(buttonClassName, { [activeClassName]: lang === "ru" })}
        onClick={getClickHandler("ru")}
      >
        RU
      </Button>
      <Box className='border border-l-0 border-primary' />
      <Button
        className={clsx(buttonClassName, { [activeClassName]: lang === "en" })}
        onClick={getClickHandler("en")}
      >
        ENG
      </Button>
    </Box>
  );
};
