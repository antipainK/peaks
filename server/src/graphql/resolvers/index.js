const userResolvers = require('./user');
const peakResolvers = require('./peak');
const chatResolvers = require('./chat');
const messageResolvers = require('./message');
const reactionResolvers = require('./reaction');
const expeditionResolvers = require('./expedition');
const expeditionInviteResolvers = require('./expeditionInvite');
const trackResolvers = require('./track');
const trackLocationResolvers = require('./trackLocation');
const trackPhotoResolvers = require('./trackPhoto');
const achievementResolvers = require('./achievement');
const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = [
  { DateTime: GraphQLDateTime },
  userResolvers,
  peakResolvers,
  expeditionResolvers,
  expeditionInviteResolvers,
  chatResolvers,
  messageResolvers,
  reactionResolvers,
  trackResolvers,
  trackLocationResolvers,
  trackPhotoResolvers,
  achievementResolvers,
];
