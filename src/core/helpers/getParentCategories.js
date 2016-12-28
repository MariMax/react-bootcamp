export const getParentCategories = (items, parentId = null) => {
  if (parentId === null) return [];
  const item = items[parentId];
  return [item, ...getParentCategories(items, item.parent)];
}