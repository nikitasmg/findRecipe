export const fileFromBlobUrl = async (url: string) => await fetch(url).then((r) => r.blob());
