const Expedition = require('../../db/models/expedition');
const ParticipantExpedition = require('../../db/models/participantExpedition');

const participantResolvers = {
  Query: {
    singleRecord: async (parent, { id }, ctx) => {
      const single = await ParticipantExpedition.query().findbyId(id);
      if (single) {
        return single;
      } else {
        throw new Error('no match with id');
      }
    },
  },
  Mutation: {
    addParticipant: async (parent, { expeditionId, userId }, ctx) => {
      const currParticipants = await ParticipantExpedition.query()
        .where('expeditionId', expeditionId)
        .resultSize();
      const maxParticipants = await Expedition.query()
        .select('maxParticipants')
        .where('id', expeditionId);
      if (currParticipants < maxParticipants) {
        const newParticpant = await ParticipantExpedition.query().insert({
          userId: userId,
          expeditionId: expeditionId,
        });
        return newParticpant;
      } else {
        throw new Error('Too much participants.');
      }
    },
    deleteById: async (parent, { id }, ctx) => {
      const participant = await ParticipantExpedition.query().deleteById(id);
      return participant;
    },
    deleteByExpeditionAndParticipant: async (parent, { input }, ctx) => {
      const particpant = await ParticipantExpedition.query()
        .delete()
        .where(input);
      return particpant;
    },
  },
};

module.exports = participantResolvers;
