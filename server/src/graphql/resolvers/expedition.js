const Expedition = require('../../db/models/expedition');

const expeditionResolvers = {
  Query: {
    expedition: async (parent, { id }, ctx) => {
      const expedition = await Expedition.query().findById(id);
      const participants = await ParticipantExpedition.query()
        .select('users.*')
        .join('users', 'participantsExpeditions.userId', 'users.id')
        .where('expeditionId', expeditionId);
      if (expedition) {
        return {expedition, participants};
      } else {
        throw new Error('No expedition found');
      }
    },
    expeditions: async (parent, {fromDate, toDate}, ctx) => {
      const expeditions;
      if( fromDate && toDate){
        expeditions = await Expedition.query().where('date', '>=' , fromDate).where('date','<=', toDate);
      }else if(fromDate && !toDate){
        expeditions = await Expedition.query().where('date', '>=' , fromDate);
      }else if(!fromDate && toDate){
        expeditions = await Expedition.query().where('date', '<=' , toDate);
      }else{
        expeditions = await Expedition.query();
      }
      if (expeditions) {
        return expeditions;
      } else {
        throw new Error('No expeditions found');
      }
    },

  },
  Mutation: {
    cancelExpedition: async (parent, { id }, ctx) => {
      const expedition = await Expedition.query().deleteById(id);
      return expedition;
    },
    addExpedition: async (parent, { input }, ctx) => {
      const expedition = await Expedition.query().insert(input);
      return expedition;
    },
    updateExpedition: async (parent, { input }, ctx) => {
      const { id, ...attributes } = input;
      const expedition = await Expedition.query().patchAndFetchById(
        id,
        attributes
      );
      return expedition;
    },
  },
};

module.exports = expeditionResolvers;
