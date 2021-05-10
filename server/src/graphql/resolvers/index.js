const userResolvers = require('./user');
const peakResolvers = require('./peak');
const chatResolvers = require('./chat');
const messageResolvers = require('./message');
const expeditionResolvers = require('./expedition');
const expeditionInviteResolvers = require('./expeditionInvite');
const trackResolvers = require('./track');
const trackLocationResolvers = require('./trackLocation');
const trackPhotoResolvers = require('./trackPhoto');
const userAchivementResolvers = require('./userAchivement');
const achivementResolvers = require('./achivement');
const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = [
  { DateTime: GraphQLDateTime },
  userResolvers,
  peakResolvers,
  expeditionResolvers,
  expeditionInviteResolvers,
  chatResolvers,
  messageResolvers,
  trackResolvers,
  trackLocationResolvers,
  trackPhotoResolvers,
  userAchivementResolvers,
  achivementResolvers,
];
