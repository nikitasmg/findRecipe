import { Box } from "@mui/material";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useLang } from "~/shared/hooks/useLang";
import { Languages } from "~/shared/types/Languages";
import { Button } from "../Button";

type Props = {
  onLangChange?: (lang: Languages) => void;
};

export const LangSwitcher: React.FC<Props> = ({ onLangChange }) => {
  const { lang, setLang } = useLang();

  const activeClassName = "bg-primary text-white hover:bg-primaryActive";

  const buttonClassName = "rounded-none";

  const getClickHandler = (newLang: Languages) => () => {
    setLang(newLang);
  };

  useEffect(() => {
    onLangChange?.(lang);
  }, [onLangChange, lang]);

  return (
    <Box className='flex border border-primary w-fit rounded-md overflow-hidden'>
      <Button
        className={clsx(buttonClassName, { [activeClassName]: lang === "ru" })}
        onClick={getClickHandler("ru")}
        size='small'
      >
        ru
      </Button>
      <Box className='border border-l-0 border-primary' />
      <Button
        className={clsx(buttonClassName, { [activeClassName]: lang === "en" })}
        onClick={getClickHandler("en")}
        size='small'
      >
        en
      </Button>
    </Box>
  );
};
