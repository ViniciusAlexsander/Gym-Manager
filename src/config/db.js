const {Pool} = require("pg");

module.exports = new Pool({
  user: 'postgres',
  password: "vinicius25",
  host: "localhost",
  port: 5432,
  database: "gymmanager" 
})
