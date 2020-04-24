// Update with your config settings.
require("dotenv").config("./env");

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: 'use-my-tools'
    },
    migrations: {
      directory: './dataBase/migrations',
    },
    seeds: {
      directory: './dataBase/seeds',
    },
    pool: {
      min: 2, 
      max: 10,
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations'
    }
  },
  
  testing: {
    client: 'sqlite3',
    connection: { filename: './database/testing.db3' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
},
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },

    seeds: {
      tableName: 'knex_migrations'
    }
  }
};
