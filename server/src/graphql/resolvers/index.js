const userResolvers = require('./user');
const peakResolvers = require('./peak');
const chatResolvers = require('./chat');
const messageResolvers = require('./message');
const expeditionResolvers = require('./expedition');
const expeditionInviteResolvers = require('./expeditionInvite');
const expeditionLocationResolvers = require('./expeditionLocation');
const expeditionPhotoResolvers = require('./expeditionPhoto');
const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = [
  { DateTime: GraphQLDateTime },
  userResolvers,
  peakResolvers,
  expeditionResolvers,
  expeditionInviteResolvers,
  chatResolvers,
  messageResolvers,
  expeditionLocationResolvers,
  expeditionPhotoResolvers,
];
