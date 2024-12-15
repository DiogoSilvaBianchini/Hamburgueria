require("dotenv").config()

module.exports = {
  "development": {
    "username": process.env.DB_POSTGRES_USER_NAME,
    "password": process.env.DB_POSTGRES_PASS,
    "database": process.env.DB_POSTGRES_NAME,
    "host": "0.0.0.0",
    "dialect": "postgres",
    "logging": false,
    "pool": {
      max: 10,
      min: 1,
      acquire: 15000,
      idle: 10000
    },
    "timezone": "-03:00"
  },
  "production": {
    "username": process.env.DB_POSTGRES_USER_NAME,
    "password": process.env.DB_POSTGRES_PASS,
    "database": process.env.DB_POSTGRES_NAME,
    "host": "db_postgres",
    "dialect": "postgres",
    "logging": false,
    "pool": {
      max: 10,
      min: 1,
      acquire: 30000,
      idle: 10000
    },
    "timezone": "-03:00"
  }
}
