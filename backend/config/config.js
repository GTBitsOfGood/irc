let config = {};

config.port = 5000;
config.db_path = 'hello';
config.db_url = `mongodb://localhost:27017/${config.db_path}`;

module.exports = config;
