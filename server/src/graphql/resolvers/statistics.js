const Peak = require('../../db/models/peak');
const Track = require('../../db/models/track');
const Expedition = require('../../db/models/expedition');

const statisticsResolvers = {
    Statistics: {
        howManyPeaksFinished: async (parent, args, ctx) => {
            return parent
        },
        howManyExpeditionsFinished: async (parent, args, ctx) => {
            return parent
        },
    },

    HowManyPeaksFinished: {
        finishedPeaks: async (parent, args, ctx) => {
            const userPeaksDistinctCount = await Expedition.query().where('date', '<', new Date())
                .whereExists(Track.query().where('userId', '=', parent.id))
                .countDistinct('peakId');
            return userPeaksDistinctCount[0].count
        },
        allPeaks: async (parent, args, ctx) => {
            const peaksCount = await Peak.query().count();
            return peaksCount[0].count
        },
    },

    HowManyExpeditionsFinished: {
        finishedExpeditions: async (parent, args, ctx) => {
            const userExpeditionCount = await Expedition.query().count().where('date', '<', new Date()).whereExists(Track.query().where('userId', '=', parent.id))
            return userExpeditionCount[0].count
        }
    },

};

module.exports = statisticsResolvers;