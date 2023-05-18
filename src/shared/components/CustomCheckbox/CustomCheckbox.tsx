import React from "react";
import { Checkbox, CheckboxProps } from "@mui/material";
import { colors } from "~/app/providers/Theme";

const DefaultIcon = () => (
  <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g filter='url(#filter0_dd_288_811)'>
      <rect x='1' y='1' width='16' height='16' rx='4' fill='white' />
      <path
        d='M5 8.5L6.5 10'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
    <defs>
      <filter
        id='filter0_dd_288_811'
        x='0'
        y='0'
        width='18'
        height='19'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity='0' result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        />
        <feMorphology
          radius='1'
          operator='dilate'
          in='SourceAlpha'
          result='effect1_dropShadow_288_811'
        />
        <feOffset />
        <feColorMatrix
          type='matrix'
          values='0 0 0 0 0.27451 0 0 0 0 0.308497 0 0 0 0 0.376471 0 0 0 0.16 0'
        />
        <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_288_811' />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        />
        <feOffset dy='1' />
        <feGaussianBlur stdDeviation='0.5' />
        <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0' />
        <feBlend
          mode='normal'
          in2='effect1_dropShadow_288_811'
          result='effect2_dropShadow_288_811'
        />
        <feBlend mode='normal' in='SourceGraphic' in2='effect2_dropShadow_288_811' result='shape' />
      </filter>
    </defs>
  </svg>
);

const CheckedIcon = () => (
  <svg width='18' height='18' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect width='16' height='16' rx='4' fill={colors.primary} />
    <path
      d='M3.75 7.75L6.75 10.75L12.25 5.25'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const IndeterminateIcon = () => (
  <svg width='18' height='18' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect width='16' height='16' rx='4' fill={colors.primary} />
    <rect x='3' y='7' width='10' height='2' rx='1' fill='white' />
  </svg>
);

export const CustomCheckbox: React.FC<CheckboxProps> = (props) => {
  return (
    <Checkbox
      {...props}
      icon={<DefaultIcon />}
      checkedIcon={<CheckedIcon />}
      indeterminateIcon={<IndeterminateIcon />}
    />
  );
};
