export const formatDescriptionForTable = (description: string) =>
  description.length > 100 ? description.slice(0, 100) + "..." : description;
