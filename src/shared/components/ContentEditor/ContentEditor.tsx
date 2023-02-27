import React, { ChangeEvent } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

type Props = {
  value?: string;
  id?: string;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const ContentEditor: React.FC<Props> = ({
  value,
  id,
  name = "editor",
  onChange,
  onBlur,
  onFocus
}) => {
  const handleEvent =
    (eventHandler?: (event: ChangeEvent<HTMLInputElement>) => void) =>
    (_: unknown, editor: typeof ClassicEditor) => {
      const data = editor.getData();
      // eslint-disable-next-line xss/no-mixed-html
      const event = { target: { name, value: data.data } } as ChangeEvent<HTMLInputElement>;
      eventHandler?.(event);
    };

  return (
    <CKEditor
      id={id}
      editor={ClassicEditor}
      data={value ?? ""}
      onChange={handleEvent(onChange)}
      onBlur={handleEvent(onBlur)}
      onFocus={handleEvent(onFocus)}
    />
  );
};
