// a bit ugly but at least doesn't require any API changes for now c:
const getSecondUserName = (threadName, currentName) =>
  threadName.split(' - ').find((name) => name !== currentName);

export default getSecondUserName;
