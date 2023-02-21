import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Button, ButtonProps } from "@mui/material";

type Props = {
  opened?: boolean;
} & ButtonProps;

export const MenuButton: React.FC<Props> = ({ opened = false, ...props }) => {
  return <Button {...props}>{opened ? <MenuOpenIcon /> : <MenuIcon />}</Button>;
};
