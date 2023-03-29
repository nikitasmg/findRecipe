import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { RawEditorSettings } from "tinymce";
import { Box, Skeleton } from "@mui/material";
import clsx from "clsx";
import { createEvent } from "./lib/createEvent";
import { getNativeFileUrl } from "./lib/getNativeFileUrl";
import styles from "./ContentEditor.module.scss";

type Props = {
  value: string;
  apiKey: string;
  name: string;
  error?: boolean;
  onChange?: (event: { target: { value: string; name: string } }) => void;
  getUploadedUrl?: (blobUrl: string) => Promise<string>;
  settings?: Omit<RawEditorSettings, "selector" | "target">;
};

export const ContentEditor: React.FC<Props> = React.memo(
  ({ value, name, apiKey, onChange, getUploadedUrl, error, settings = {} }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
      <Box
        className={clsx("relative", `min-h-[${settings?.min_height ?? 600}px]`, {
          [styles.editor_error]: error
        })}
      >
        {(!apiKey || isLoading) && (
          <Skeleton
            className='absolute top-0 left-0 h-full w-full z-999'
            variant='rectangular'
            height={settings?.min_height ?? 600}
          />
        )}
        <Editor
          onInit={(_, editor) => {
            editor.setContent(value);
            setIsLoading(false);
          }}
          value={value}
          apiKey={apiKey}
          onEditorChange={(value) => onChange?.(createEvent(value, name))}
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
            min_height: 600,
            contextmenu: "link image imagetools table",
            skin: "oxide",
            content_css: "default",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            statusbar: false,
            ...settings
          }}
        />
      </Box>
    );
  }
);

ContentEditor.displayName = "ContentEditor";
