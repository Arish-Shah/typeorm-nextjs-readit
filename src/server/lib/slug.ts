export const slugify = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-y-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};
