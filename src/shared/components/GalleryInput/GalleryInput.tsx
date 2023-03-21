import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ImageListItemProps,
  ImageListProps,
  TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import React, {
  FormEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useState
} from "react";
import { GalleryImage } from "~/generated/graphql";
import { useModal } from "~/shared/hooks/useModal";
import { getFileName } from "~/shared/lib/getFileName";
import { MultipleImageInput } from "../MultipleImageInput";
import { Button } from "../Button";
import { Text } from "../Text";
import { resortArray } from "~/shared/lib/resortArray";

const SortableItem = SortableElement<PropsWithChildren<ImageListItemProps>>(
  ({ children, ...props }: PropsWithChildren<ImageListItemProps>) => (
    <ImageListItem {...props}>{children}</ImageListItem>
  )
);

const SortableList = SortableContainer<PropsWithChildren<ImageListProps>>(
  ({ children, ...props }: PropsWithChildren<ImageListProps>) => {
    return <ImageList {...props}>{children}</ImageList>;
  }
);

type Props = {
  initialValue?: Partial<GalleryImage>[];
  onChange?: (gallery?: Partial<GalleryImage>[]) => void;
  onDelete?: (image: GalleryImage) => void;
  onUpdate?: (image: GalleryImage) => void;
  onUpload?: (images: Partial<GalleryImage>[]) => void;
};

export const GalleryInput: React.FC<Props> = ({
  initialValue,
  onChange,
  onUpdate,
  onDelete,
  onUpload
}) => {
  const [value, setValue] = useState<Partial<GalleryImage>[]>();

  const [imagePreview, setImagePreview] = useState<Partial<GalleryImage> | null>(null);

  const { open, handleClose, handleOpen } = useModal();

  const getHandlerImageClick =
    (image?: Partial<GalleryImage> | null): React.MouseEventHandler<HTMLLIElement> =>
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!image) {
        return;
      }
      setImagePreview(image);
      handleOpen();
    };

  const onClose = () => {
    setImagePreview(null);
    handleClose();
  };

  const handleUpdateSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const newTitle = (e.target as unknown as { value: string }[])[0].value;
    const fileFormat = imagePreview?.alt?.replace(getFileName(imagePreview?.alt ?? ""), "");
    const newAlt = `${newTitle}${fileFormat}`;

    if (imagePreview?.id) {
      onUpdate?.({ sort: imagePreview.sort, alt: newAlt, id: imagePreview.id });
    }

    setValue((value = []) =>
      value.map((image) => {
        if (image === imagePreview) {
          return { ...imagePreview, alt: newAlt, id: imagePreview.id };
        }
        return image;
      })
    );

    onClose();
  };

  const getDeleteHandler =
    (image?: Partial<GalleryImage> | null): MouseEventHandler<Element> =>
    (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (image?.id) {
        onDelete?.({ ...image, id: image.id });
      }

      setValue((value = []) => value.filter((item) => item !== image));
    };

  const onAddImages = (files?: File[] | null) => {
    if (!files) {
      return;
    }

    setValue((value = []) => {
      const newFiles = [
        ...value,
        ...files.map((file, i) => ({
          alt: file.name,
          url: URL.createObjectURL(file),
          sort: value.length + i
        }))
      ];

      onUpload?.(newFiles);

      return newFiles;
    });
  };

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setValue((rows = []) => {
      const newRows = resortArray(oldIndex, newIndex, rows);

      const updates = newRows.reduce((res: Omit<GalleryImage, "url">[], cur, i) => {
        if (cur.id) {
          res.push({ sort: i + 1, alt: cur.alt, id: cur.id });
        }

        return res;
      }, []);

      updates.map((update) => onUpdate?.(update));

      return newRows;
    });
  };

  useEffect(() => {
    setValue((value) => {
      if (!value) {
        return initialValue;
      }

      return value;
    });
  }, [initialValue]);

  useEffect(() => {
    onChange?.(value);
  }, [value, onChange]);

  return (
    <Box className='flex flex-col gap-6 pt-2'>
      <MultipleImageInput onChange={onAddImages} />
      <SortableList cols={4} rowHeight={200} gap={10} onSortEnd={onSortEnd} axis='xy' distance={1}>
        {(value ?? []).map((item, i) => (
          <SortableItem
            index={i}
            key={item.id}
            className='relative overflow-hidden shadow-md'
            onClick={getHandlerImageClick(item)}
          >
            <IconButton
              onClick={getDeleteHandler(item)}
              color='error'
              className='absolute top-0 right-0 bg-red-100 hover:bg-red-200 shadow'
            >
              <CloseIcon />
            </IconButton>
            <img src={item.url as string} alt={item.alt as string} loading='lazy' />
            <ImageListItemBar title={item.alt as string} />
          </SortableItem>
        ))}
      </SortableList>

      <Dialog open={!!open} onClose={onClose}>
        <DialogTitle className='flex justify-between items-center'>
          {imagePreview?.alt}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box component='form' className='flex flex-col gap-6' onSubmit={handleUpdateSubmit}>
            <Box className='h-[50vh] w-[50vw] flex items-center justify-center'>
              <img
                className='max-h-full object-cover'
                src={imagePreview?.url as string}
                alt={imagePreview?.alt as string}
              />
            </Box>

            <TextField
              name='title'
              defaultValue={getFileName(imagePreview?.alt ?? "")}
              label={<Text>Title</Text>}
            />

            <Button type='submit' variant='outlined'>
              Save
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
