const ExpeditionRoute = require('../../db/models/expeditionRoute');

const expeditionRouteResolvers = {
  ExpeditionRoute: {
    user: async (parent, args, ctx) => {
      return await parent.$relatedQuery('user');
    },
    expedition: async (parent, args, ctx) => {
      return await parent.$relatedQuery('expedition');
    },
  },
  Query: {
    expeditionRoute: async (parent, { id }) => {
      const expeditionRoute = ExpeditionRoute.query().findById(id);
      if (!expeditionRoute) {
        throw new Error('No expedition route found');
      }
      return expeditionRoute;
    },
  },
  Mutation: {
    createExpeditionRoute: async (parent, { input }) => {
      const expeditionRoute = ExpeditionRoute.query().insert(input);
      return expeditionRoute;
    },
    deleteExpeditionRoute: async (parent, { id }) => {
      const expeditionRoute = ExpeditionRoute.query().deleteById(id);
      return expeditionRoute;
    },
  },
};
