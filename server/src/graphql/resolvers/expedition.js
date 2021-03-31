const Expedition = require('../../db/models/expedition')

const expeditionResolvers = {
    Query: {
        expedition: async (parent, {id}, ctx) =>{
            const expedition = await Expedition.query().findById(id);
            if(expedition){
                return expedition;
            }else{
                throw new Error('No expedition found');
            }
        },
        expeditionsBefore: async (parent, {date} , ctx) => {
            const expeditions = await Expedition.query().where('date','<',date);
            if(expeditions){
                return expeditions;
            }else{
                throw new Error('No expeditions found');
            }
        },
        userExpeditions: async (parent, {authorId}, ctx) =>{
            const expeditions = await Expedition.query().where('authorId', authorId);
            if(expeditions){
                return expeditions;
            }else{
                throw new Error('No expeditions found');
            } 
        },
        peakExpeditions: async (parent, {peakId}, ctx) =>{
            const expeditions = await Expedition.query().where('peakId', peakId);
            if(expeditions){
                return expeditions;
            }else{
                throw new Error('No expeditions found');
            } 
        },

    },
    Mutation:{
        cancelExpedition: async (parent, {id}, ctx) => {
            const expedition = await Expedition.query().deleteById(id);
            return expedition;
        },
        addExpedition: async (parent, {input}, ctx) =>{
            const expedition = await Expedition.query().insert(input);
            return expedition;
        },
        updateExpedition: async (parent, {input}, ctx) =>{
            const {id, ...atributes} = input;
            const expedition = await Expedition.query().patchAndFetchById(id, atributes);
            return expedition;
        },
    },
};