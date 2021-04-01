const Expedition = require('../../db/models/expedition');
const Participant = require('../../db/models/participant');

const participantResolvers = {
  Query: {
    singleRecord: async (parent, { id }, ctx) => {
      const single = await Participant.query().findbyId(id);
      if (single) {
        return single;
      } else {
        throw new Error('no match with id');
      }
    },
    allUserExpeditions: async (parent, { participantId }, ctx) => {
      const expeditions = await Participant.query()
        .select('expeditions.*')
        .join('expeditions', 'participants.expeditionId', 'expeditions.id')
        .where('participantId', particpiantId);
      if (expeditions) {
        return expeditions;
      } else {
        throw new Error('No expedition for this user');
      }
    },
    allExpeditionsParticipants: async (parent, { expeditionId }, ctx) => {
      const expeditions = await Participant.query()
        .select('users.*')
        .join('users', 'participants.participantId', 'users.id')
        .where('expeditionId', expeditionId);
      if (expeditions) {
        return expeditions;
      } else {
        throw new Error('No participants for this expedition');
      }
    },
  },
  Mutation: {
    addParticipant: async (parent, { expeditionId, participantId }, ctx) => {
      const currParticipants = await Participant.query()
        .where('expeditionId', expeditionId)
        .resultSize();
      const maxParticipants = await Expedition.query()
        .select('maxParticipants')
        .where('id', expeditionId);
      if (currParticipants < maxParticipants) {
        const newParticpant = await Participant.query().insert({
          participantId: participantId,
          expeditionId: expeditionId,
        });
        return newParticpant;
      } else {
        throw new Error('Too much participants.');
      }
    },
    deleteById: async (parent, { id }, ctx) => {
      const participant = await Participant.query().deleteById(id);
      return participant;
    },
    deleteByExpeditionAndParticipant: async (parent, { input }, ctx) => {
      const particpant = await Participant.query().delete().where(input);
      return particpant;
    },
  },
};

module.exports = participantResolvers;
