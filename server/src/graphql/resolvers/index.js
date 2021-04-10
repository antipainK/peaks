const userResolvers = require('./user');
const peakResolvers = require('./peak');
const expeditionResolvers = require('./expedition');
const participantResolvers = require('./participantExpedition');
const expeditionInviteResolvers = require('./expeditionInvite');
const { GraphQLDateTime } = require('graphql-iso-date');

module.exports = [
  { DateTime: GraphQLDateTime },
  userResolvers,
  peakResolvers,
  expeditionResolvers,
  participantResolvers,
  expeditionInviteResolvers,
];
