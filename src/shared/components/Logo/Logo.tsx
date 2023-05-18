import React from "react";
import { clsx } from "clsx";
import logo from "~shared/assets/svg/logo.svg";

type Props = {
  size?: "small" | "big";
};

export const Logo: React.FC<Props> = ({ size }) => {
  return (
    <img
      className={clsx("shrink-0", {
        "w-[150px] h-[35px]": !size,
        "w-[200px] h-[50px]": size === "big",
        "w-[110px] h-[25px]": size === "small"
      })}
      src={logo}
      alt='logo'
    />
  );
};
