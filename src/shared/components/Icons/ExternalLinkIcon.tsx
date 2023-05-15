import React from "react";
import { colors } from "~/app/providers/Theme";

export const ExternalLinkIcon = () => {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M8.33301 5.00004H4.99967C4.55765 5.00004 4.13372 5.17564 3.82116 5.4882C3.5086 5.80076 3.33301 6.22468 3.33301 6.66671V15C3.33301 15.4421 3.5086 15.866 3.82116 16.1786C4.13372 16.4911 4.55765 16.6667 4.99967 16.6667H13.333C13.775 16.6667 14.199 16.4911 14.5115 16.1786C14.8241 15.866 14.9997 15.4421 14.9997 15V11.6667M11.6663 3.33337H16.6663M16.6663 3.33337V8.33337M16.6663 3.33337L8.33301 11.6667'
        stroke={colors.blue}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
