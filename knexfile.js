// Update with your config settings.
require("dotenv").config("./env");

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: "use-my-tools",
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
    pool: {
      min: 2,
      max: 10,
    }
  },

  development2: {
    client: "pg",
    connection: {
      host: "ec2-3-228-114-251.compute-1.amazonaws.com",
      port: 5432,
      user: process.env.USER2,
      password: process.env.PASSWORD2,
      database: "d65qk1h9u79pt2",
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
    pool: {
      min: 2,
      max: 10,
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./database/migrations",
    }
  },

  testing: {
    client: "sqlite3",
    connection: { filename: "./database/testing.db3" },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
      tableName: "dbmigrations",
    },
    seeds: { directory: "./database/seeds" },
  },
  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./database/migrations",
    }
  },
};
