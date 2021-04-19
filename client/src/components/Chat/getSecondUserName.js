const getSecondUserName = (threadUsers, currentUserId) =>
  threadUsers.find((user) => user.id !== currentUserId)?.displayName || '';

export default getSecondUserName;
