import { AlertColor, Avatar, Box, Icon, Input, InputProps, Modal, Slider } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Cropper, { Area } from "react-easy-crop";
import React, { ChangeEvent, useCallback, useState } from "react";
import { useModal } from "~/shared/hooks/useModal";
import { fileFromBlobUrl } from "~shared/lib/fileFromBlobUrl";
import { Text } from "../Text";
import getCroppedImg from "./lib/getCropImage";
import { SaveButton } from "../SaveButton";

type Props = {
  id: string;
  url: string;
  onChange: (file?: File | null) => void;
  addAlert: (severity: AlertColor, message: string) => void;
  onDelete?: () => void;
} & InputProps;

export const AvatarInput: React.FC<Props> = ({
  id,
  onChange,
  url,
  onDelete,
  addAlert,
  ...other
}) => {
  const [value, setValue] = useState<string>();

  const [selectedImage, setSelectedImage] = useState<File | null>();

  const [preSaveUrl, setPreSaveUrl] = useState<string>();

  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const [zoom, setZoom] = useState(1);

  const [rotation, setRotation] = useState(0);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const { open, handleOpen, handleClose } = useModal();

  const reset = () => {
    setRotation(0);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setCroppedAreaPixels(null);
    setSelectedImage(null);
    setPreSaveUrl("");
    setValue("");
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.webp)$/i;

    const filePath = e.target.value;

    if (!allowedExtensions.exec(filePath)) {
      addAlert("error", "Invalid file type");
      return;
    }

    setSelectedImage(e.target.files?.[0]);
    setPreSaveUrl(URL.createObjectURL(e.target.files?.[0] as File));
    handleOpen();
  };

  const handleDeleteImage = () => {
    onDelete?.();
    setSelectedImage(null);
    reset();
  };

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onClose = () => {
    handleClose();
    reset();
  };

  const showCroppedImage = useCallback(async () => {
    if (!croppedAreaPixels) {
      return;
    }

    try {
      const croppedImage = await getCroppedImg(
        URL.createObjectURL(selectedImage as Blob),
        croppedAreaPixels,
        rotation
      );

      if (typeof croppedImage !== "string") {
        return;
      }

      const file = await fileFromBlobUrl(croppedImage);

      onChange?.(file as File);

      handleClose();
      reset();
    } catch (e) {
      addAlert("error", String(e));
    }
  }, [croppedAreaPixels, rotation, selectedImage, onChange, addAlert, handleClose]);

  return (
    <>
      {!url && (
        <Box className='flex items-center relative w-full h-[100px] transition hover:bg-gray-200 rounded-xl border-dashed border-2 border-primary p-4'>
          <Input
            value={value}
            inputProps={{
              accept: "image/*",
              className: "!absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-0 z-2"
            }}
            className='!absolute w-full h-full opacity-0 top-0 left-0 z-2'
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
      )}
      {url && (
        <Box className='relative text-red-700 p-6 min-w-[310px] flex justify-center'>
          <CancelIcon
            onClick={handleDeleteImage}
            onKeyPress={handleDeleteImage}
            tabIndex={0}
            className='absolute left-[65%] top-0 cursor-pointer'
          />
          <Avatar sx={{ width: "100px", height: "100px" }} src={url} />
        </Box>
      )}
      <Modal className='md:p-10' open={!!open} onClose={onClose}>
        <Box className='flex flex-col items-center gap-6 bg-mainBg pt-6 overflow-auto'>
          <Box className='relative w-[600px] h-[40vh] bg-gray-200'>
            <Cropper
              image={preSaveUrl}
              crop={crop}
              zoom={zoom}
              aspect={1}
              rotation={rotation}
              cropShape='round'
              showGrid={false}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </Box>
          <Box className='flex flex-col w-full gap-6 p-6'>
            <Box className='flex gap-4'>
              <Text>Zoom</Text>
              <Slider
                className='w-[200px]'
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby='Zoom'
                onChange={(_, zoom) => setZoom(zoom as number)}
              />
            </Box>
            <Box className='flex gap-4'>
              <Text>Rotation</Text>
              <Slider
                className='w-[200px]'
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby='Rotation'
                onChange={(_, rotation) => setRotation(rotation as number)}
              />
            </Box>

            <SaveButton onClick={showCroppedImage} />
          </Box>
        </Box>
      </Modal>
    </>
  );
};
