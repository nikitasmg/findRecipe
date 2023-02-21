import React from "react";
import { clsx } from "clsx";
import logo from "~shared/assets/images/logo-internet.jpeg";

type Props = {
  size?: "small" | "big";
};

export const Logo: React.FC<Props> = ({ size }) => {
  return (
    <img
      className={clsx("w-[35px] h-[35px]", {
        "w-[50px] h-[50px]": size === "big",
        "w-[25px] h-[25px]": size === "small"
      })}
      src={logo}
      alt='logo'
    />
  );
};
