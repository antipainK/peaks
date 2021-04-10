const userResolvers = require('./user');
const peakResolvers = require('./peak');
const chatResolvers = require('./chat');
const messageResolvers = require('./message');

module.exports = [userResolvers, peakResolvers, chatResolvers, messageResolvers];
