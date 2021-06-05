export const getQueryParts = (searchQuery) =>
  searchQuery?.toLowerCase().split(/\s+/);

export const matchQuery = (fieldToMatch, searchQuery) => {
  const searchParts = getQueryParts(searchQuery);
  return searchParts.every((part) =>
    fieldToMatch?.toLowerCase().includes(part)
  );
};
