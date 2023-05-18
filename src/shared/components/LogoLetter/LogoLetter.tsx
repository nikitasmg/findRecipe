import React from "react";
import { clsx } from "clsx";
import logo from "~shared/assets/svg/logo-letter.svg";

type Props = {
  size?: "small" | "big";
};

export const LogoLetter: React.FC<Props> = ({ size }) => {
  return (
    <img
      className={clsx("shrink-0", {
        "w-[35px] h-[35px]": !size,
        "w-[200px] h-[50px]": size === "big",
        "w-[25px] h-[25px]": size === "small"
      })}
      src={logo}
      alt='logo'
    />
  );
};
