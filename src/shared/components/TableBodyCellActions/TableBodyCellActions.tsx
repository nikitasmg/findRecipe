import { Box, CircularProgress, TableCell } from "@mui/material";
import clsx from "clsx";
import React, { Fragment } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import { Button } from "../Button";

type Props = {
  spinnerVisible?: boolean;
  isEditMode?: boolean;
  handleEdit?: () => void;
  handleSuccess?: () => void;
  handleRemove?: () => void;
};

export const TableBodyCellActions: React.FC<Props> = ({
  spinnerVisible = false,
  isEditMode = false,
  handleEdit,
  handleSuccess,
  handleRemove
}) => {
  return (
    <TableCell key='actions' className='w-[180px]'>
      <Box
        className={clsx("flex items-center", {
          "justify-end": !spinnerVisible,
          "justify-center": spinnerVisible
        })}
      >
        {spinnerVisible && <CircularProgress className='!w-[30px] !h-[30px]' />}

        {!spinnerVisible && (
          <Fragment>
            {!isEditMode && handleEdit && (
              <Button onClick={handleEdit} color='info'>
                <EditIcon />
              </Button>
            )}

            {isEditMode && handleSuccess && (
              <Button onClick={handleSuccess} color='success'>
                <DoneIcon />
              </Button>
            )}

            {handleRemove && (
              <Button type='button' color='error' onClick={handleRemove}>
                <DeleteIcon />
              </Button>
            )}
          </Fragment>
        )}
      </Box>
    </TableCell>
  );
};
