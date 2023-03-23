import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import clsx from "clsx";

type Props = {
  title: string;
  format: string;
  onCardClick?: () => void;
};

enum FormatBackground {
  "pdf" = "bg-red-700",
  "doc" = "bg-blue-700",
  "docx" = "bg-blue-700",
  "xls" = "bg-green-700",
  "xlsx" = "bg-green-700",
  "csv" = "bg-green-600",
  "png" = "bg-orange-400",
  "jpg" = "bg-orange-400",
  "jpeg" = "bg-orange-400",
  "bmp" = "bg-orange-400",
  "webp" = "bg-orange-400",
  "gif" = "bg-orange-400",
  "ppt" = "bg-red-500",
  "pptx" = "bg-red-500",
  "default" = "bg-zinc-400"
}

export const DocumentCard: React.FC<Props> = ({ title, format, onCardClick }) => {
  const backgroundFormat = FormatBackground[format as keyof typeof FormatBackground];

  return (
    <Paper
      elevation={3}
      onClick={onCardClick}
      className='w-[160px] h-[160px] p-4 relative flex flex-col gap-4 items-center justify-end text-gray-400 rounded-xl hover:bg-slate-200'
      onKeyPress={onCardClick}
      tabIndex={0}
    >
      <Box className='w-full flex justify-center relative'>
        <DescriptionIcon className='w-[50%] h-auto' />
        <Typography
          variant='subtitle1'
          align='center'
          className={clsx(
            "text-white absolute bottom-[-0.5rem] px-2 rounded-md left-[20%] max-w-[50px] text-ellipsis overflow-hidden",
            {
              [backgroundFormat]: backgroundFormat,
              [FormatBackground.default]: !backgroundFormat
            }
          )}
        >
          {format}
        </Typography>
      </Box>
      <Typography
        variant='body1'
        align='center'
        className='w-full h-[40px] overflow-hidden text-ellipsis text-black'
      >
        {title}
      </Typography>
    </Paper>
  );
};
