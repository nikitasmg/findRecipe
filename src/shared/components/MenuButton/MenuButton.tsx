import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { ButtonProps } from "@mui/material";
import { Button } from "../Button";

type Props = {
  opened?: boolean;
} & ButtonProps;

export const MenuButton: React.FC<Props> = ({ opened = false, ...props }) => {
  return <Button {...props}>{opened ? <MenuOpenIcon /> : <MenuIcon />}</Button>;
};
