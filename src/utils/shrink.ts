export const shrink = (item) => {
  if (item.length > 400) return item.substring(0, 400) + "...";
  else return item;
};
