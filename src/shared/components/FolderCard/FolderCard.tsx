import { Paper, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import InfoIcon from "@mui/icons-material/Info";
import { Text } from "../Text";
import clsx from "clsx";

type Props = {
  title: string;
  countFiles?: number;
  onInfoClick?: () => void;
  onCardClick?: () => void;
  isMovePreview?: boolean;
};

export const FolderCard = forwardRef<HTMLDivElement, Props>(
  ({ title, countFiles, isMovePreview = false, onInfoClick, onCardClick }, ref) => {
    const folderClassName = "w-[40%] h-auto";

    const onClickInfo: React.MouseEventHandler<SVGSVGElement> = (e) => {
      e.preventDefault();
      e.stopPropagation();
      onInfoClick?.();
    };

    return (
      <Paper
        elevation={3}
        onClick={onCardClick}
        onKeyPress={onCardClick}
        tabIndex={0}
        ref={ref}
        className={clsx(
          "w-[160px] h-[160px] p-4 relative flex flex-col items-center justify-end text-gray-400 rounded-xl hover:bg-slate-200",
          { "bg-slate-200": isMovePreview }
        )}
      >
        <InfoIcon
          className='absolute top-4 right-4 text-gray-700'
          tabIndex={0}
          onClick={onClickInfo}
          onKeyPress={onInfoClick}
        />
        {isMovePreview ? (
          <DriveFileMoveIcon className={folderClassName} />
        ) : (
          <FolderIcon className={folderClassName} />
        )}
        <Typography
          variant='body1'
          align='center'
          className='w-full h-[40px] overflow-hidden text-ellipsis text-black'
        >
          {title}
        </Typography>
        <Typography
          variant='body2'
          align='center'
          className='w-full overflow-hidden text-ellipsis text-gray-400'
        >
          {countFiles} <Text component='span'>files</Text>
        </Typography>
      </Paper>
    );
  }
);

FolderCard.displayName = "FolderCard";
