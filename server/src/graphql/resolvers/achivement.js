const Achivement = require('../../db/models/achivement');

const achivementResolvers = {
    Achivement:{
        peak: async (parent, args, ctx) => {
            return await parent.$relatedQuery('peak');
        },
    },
    Query:{
        achivement: async (parent, {id = {}}, ctx) =>{
            let achivements = Achivement.query();

            if(id){
                achivements = achivements.where('id', id);
            }

            return await achivements;
        },
    },
}

module.exports = achivementResolvers; 