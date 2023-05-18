import React, { forwardRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { RawEditorSettings } from "tinymce";
import { Box, CircularProgress } from "@mui/material";
import clsx from "clsx";
import { createEvent } from "./lib/createEvent";
import { getNativeFileUrl } from "./lib/getNativeFileUrl";
import styles from "./ContentEditor.module.scss";

type EditorEvent = { target: { value: string; name: string } };

type Props = {
  value: string;
  apiKey: string;
  name: string;
  error?: boolean;
  onChange?: (event: EditorEvent) => void;
  onBlur?: (event: EditorEvent) => void;
  onFocus?: (event: EditorEvent) => void;
  getUploadedUrl?: (blobUrl: string) => Promise<string>;
  settings?: Omit<RawEditorSettings, "selector" | "target" | "min_height">;
  size?: "small" | "medium";
};

const defaultHandler = (_: EditorEvent) => void _;

export const ContentEditor: React.FC<Props> = React.memo(
  forwardRef<React.LegacyRef<Editor>, Props>(
    (
      {
        value,
        name,
        apiKey,
        onChange = defaultHandler,
        onBlur = defaultHandler,
        getUploadedUrl,
        error,
        settings = {},
        size = "medium"
      },
      ref
    ) => {
      const [isLoading, setIsLoading] = useState(true);

      const height = size === "small" ? 200 : 600;

      const handleChange = (value: string) => onChange?.(createEvent(value, name));

      return (
        <Box
          className={clsx("relative z-999", styles.editor, {
            "min-h-[200px]": size === "small",
            "min-h-[600px]": size === "medium",
            "text-transparent": isLoading,
            [styles.editor_error]: error
          })}
        >
          {(!apiKey || isLoading) && (
            <Box className='flex h-[20vh] w-full justify-center items-center'>
              <CircularProgress />
            </Box>
          )}
          <Editor
            ref={ref as React.LegacyRef<Editor>}
            onInit={(_, editor) => {
              setIsLoading(false);
              editor.setContent(value);
            }}
            value={value}
            apiKey={apiKey}
            onEditorChange={handleChange}
            onBlur={onBlur}
            init={{
              selector: "textarea" as never,
              language: "ru",
              plugins:
                "autoresize print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help charmap quickbars emoticons",
              menubar: "file edit view insert format tools table",
              toolbar:
                "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview print | insertfile image media link codesample | ltr rtl",
              toolbar_sticky: false,
              autosave_ask_before_unload: false,
              autosave_interval: "30s",
              autosave_prefix: "{path}{query}-{id}-",
              autosave_restore_when_empty: false,
              autosave_retention: "2m",
              image_advtab: true,
              deprecation_warnings: false,
              importcss_append: true,
              images_upload_handler: (blob) => {
                getUploadedUrl?.(blob.blobUri());
              },
              file_picker_callback: async (callback) => {
                const blobUrl = await getNativeFileUrl();
                const fileUrl = (await getUploadedUrl?.(blobUrl)) || blobUrl;

                callback(fileUrl);
              },
              quickbars_selection_toolbar:
                "bold italic | quicklink h1 h2 h3 | fontselect fontsizeselect formatselect | blockquote quickimage quicktable",
              toolbar_mode: "sliding",
              toolbar_drawer: false,
              autoresize_bottom_margin: 20,
              min_height: height,
              contextmenu: "link image imagetools table",
              skin: "oxide",
              content_css: "default",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              statusbar: false,
              table_default_attributes: {},
              ...settings
            }}
          />
        </Box>
      );
    }
  )
);

ContentEditor.displayName = "ContentEditor";
