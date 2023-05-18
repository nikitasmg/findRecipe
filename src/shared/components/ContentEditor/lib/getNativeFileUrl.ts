import { getFilesFromNative } from "./getFilesFromNative";
import { compose, prop } from "rambda";
import { getFileUrl } from "./getFileUrl";

export const getNativeFileUrl = () => getFilesFromNative().then(compose(getFileUrl, prop("0")));
