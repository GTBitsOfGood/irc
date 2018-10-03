var config = {}

var env = require("./.env");

config.port = 5000;
config.db_path = "hello";
config.db_url = `mongodb+srv://${env.username}:${env.password}@ircdb-adim8.mongodb.net/test?retryWrites=true`

module.exports = config;
