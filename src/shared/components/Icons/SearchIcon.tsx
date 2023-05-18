import React from "react";
import { colors } from "~/app/providers/Theme";

type Props = {
  color?: keyof typeof colors;
};

export const SearchIcon: React.FC<Props> = ({ color = "mainText" }) => {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M16.6667 16.6667L13.1694 13.1694M15 8.75C15 5.29822 12.2018 2.5 8.75 2.5C5.29822 2.5 2.5 5.29822 2.5 8.75C2.5 12.2018 5.29822 15 8.75 15C12.2018 15 15 12.2018 15 8.75Z'
        stroke={colors[color]}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
