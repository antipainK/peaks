const { NODE_ENV, PORT } = process.env;

module.exports = { NODE_ENV: NODE_ENV || 'development', PORT: PORT || 4000 };
