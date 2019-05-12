const env = process.env.NODE_ENV || 'development';
const config = {
  env,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: env === 'test',
  pool: {
    max: process.env.DB_MAX_CONNECTIONS || 100,
    min: 0,
    idle: process.env.DB_CONNECTION_IDLE || 100,
    evict: process.env.DB_CONNECTION_EVICT || 110
  },
  seederStorage: 'sequelize',
};

module.exports = config;
