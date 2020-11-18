module.exports = {
  type: "postgres",
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PW,
  database: process.env.PG_DB,
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
