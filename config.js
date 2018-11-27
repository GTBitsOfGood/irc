require('dotenv').config();
var config = {};

config.port = 5000;
config.db_path = "test";
config.db_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@ircdb-adim8.mongodb.net/test?retryWrites=true`;
config.JWT_SECRET = "KLD24Fj#U_RI@JRIJi5!jdf20rk3jlk4?jfa";

module.exports = config;
