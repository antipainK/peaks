const userResolvers = require('./user');
const peakResolvers = require('./peak');
const expeditionResolvers = require('./expedition');
const participantResolvers = require('./particpant');
const expeditionInviteResolvers = require('./expeditionInvite');

module.exports = [
  userResolvers,
  peakResolvers,
  expeditionResolvers,
  participantResolvers,
  expeditionInviteResolvers,
];
