import { Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import InfoIcon from "@mui/icons-material/Info";
import { Text } from "../Text";

type Props = {
  title: string;
  countFiles?: number;
  onInfoClick?: () => void;
  onCardClick?: () => void;
  withMovePreview?: boolean;
};

export const FolderCard: React.FC<Props> = ({
  title,
  countFiles,
  withMovePreview = true,
  onInfoClick,
  onCardClick
}) => {
  const [isMovePreview, setIsMovePreview] = useState(false);

  const handleEnterFile = () => setIsMovePreview(true);

  const handleLeaveFile = () => setIsMovePreview(false);

  const folderClassName = "w-[40%] h-auto";

  return (
    <Paper
      elevation={3}
      onDragStart={handleEnterFile}
      onDragOver={handleEnterFile}
      onDragEnd={handleLeaveFile}
      onDragLeave={handleLeaveFile}
      onDrop={handleLeaveFile}
      onClick={onCardClick}
      className='w-[160px] h-[160px] p-4 relative flex flex-col items-center justify-end text-gray-400 rounded-xl hover:bg-slate-200'
    >
      <InfoIcon
        className='absolute top-4 right-4 text-gray-700'
        tabIndex={0}
        onClick={onInfoClick}
        onKeyPress={onInfoClick}
      />
      {isMovePreview && withMovePreview ? (
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
};
