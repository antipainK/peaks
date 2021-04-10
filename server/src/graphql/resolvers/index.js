const userResolvers = require('./user');
const peakResolvers = require('./peak');
const chatResolvers = require('./chat');

module.exports = [userResolvers, peakResolvers, chatResolvers];
