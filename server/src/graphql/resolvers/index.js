const userResolvers = require('./user');
const peakResolvers = require('./peak');
const expeditionResolvers = require('./expedition');
const participantResolvers = require('./particpant');
const inviteResolvers = require('./invite');

module.exports = [
  userResolvers,
  peakResolvers,
  expeditionResolvers,
  participantResolvers,
  inviteResolvers,
];
