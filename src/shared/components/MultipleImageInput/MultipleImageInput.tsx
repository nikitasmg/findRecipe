import { Box, Icon, Input, InputProps } from "@mui/material";
import React, { ChangeEvent, forwardRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAlertsStore } from "~shared/stores/alerts";
import { Text } from "../Text";
import { useTranslation } from "react-i18next";

type Props = {
  id?: string;
  onChange: (files?: File[] | null) => void;
} & Omit<InputProps, "onChange">;

export const MultipleImageInput = forwardRef<HTMLDivElement, Props>(
  ({ id, onChange, ...other }, ref) => {
    const addAlert = useAlertsStore((state) => state.addAlert);

    const { t } = useTranslation();

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.webp)$/i;

      let files: File[] = [];
      if (e.target.files) {
        files = Array.from(e.target.files).reduce((res: File[], file) => {
          if (!allowedExtensions.exec(file.name)) {
            addAlert("error", `${t("Image format invalid")} ${file.name}`);
            return res;
          }

          res.push(file);
          return res;
        }, []);
      }

      onChange?.(files);
    };

    return (
      <Box ref={ref} className='w-full flex justify-center'>
        <Box className='flex items-center relative w-full h-[100px] transition hover:bg-gray-200 rounded-xl border-dashed border-2 border-primary'>
          <Input
            inputProps={{
              accept: "image/*",
              className: "!absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-0 z-2",
              multiple: true
            }}
            className='!absolute w-full h-full opacity-0'
            type='file'
            id={id}
            onChange={handleImage}
            {...other}
          />
          <label htmlFor={id} className='w-full text-center text-primary text-lg cursor-pointer'>
            <Icon className='w-auto h-[50px]' component={CloudUploadIcon} />
            <Text>Upload or drop image</Text>
          </label>
        </Box>
      </Box>
    );
  }
);

MultipleImageInput.displayName = "MultipleImageInput";
