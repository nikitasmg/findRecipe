import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box, Skeleton } from "@mui/material";
import { createEvent } from "./lib/createEvent";
import { getNativeFileUrl } from "./lib/getNativeFileUrl";

type Props = {
  value: string;
  apiKey: string;
  name: string;
  onChange?: (event: { target: { value: string; name: string } }) => void;
  getUploadedUrl?: (blobUrl: string) => Promise<string>;
};

export const ContentEditor: React.FC<Props> = React.memo(
  ({ value: initialValue, name, apiKey, onChange, getUploadedUrl }) => {
    const [localValue, setValue] = useState("");

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      onChange?.(createEvent(localValue, name));
    }, [onChange, localValue, name]);

    return (
      <Box>
        {(!apiKey || isLoading) && <Skeleton variant='rectangular' height={600} />}
        <Editor
          onInit={(_, editor) => {
            editor.setContent(initialValue);
            setIsLoading(false);
          }}
          value={localValue}
          apiKey={apiKey}
          onEditorChange={setValue}
          init={{
            selector: "textarea" as never,
            language: "ru",
            plugins:
              "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help charmap quickbars emoticons",
            menubar: "file edit view insert format tools table",
            toolbar:
              "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview print | insertfile image media link codesample | ltr rtl",
            toolbar_sticky: false,
            autosave_ask_before_unload: true,
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
            height: 600,
            image_caption: true,
            quickbars_selection_toolbar:
              "bold italic | quicklink h1 h2 h3 | fontselect fontsizeselect formatselect | blockquote quickimage quicktable",
            toolbar_mode: "sliding",
            toolbar_drawer: false,
            contextmenu: "link image imagetools table",
            skin: "oxide",
            content_css: "default",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            statusbar: false
          }}
        />
      </Box>
    );
  }
);

ContentEditor.displayName = "ContentEditor";
