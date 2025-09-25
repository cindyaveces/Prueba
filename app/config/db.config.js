module.exports = {
  HOST: "ep-old-scene-a8gztorv-pooler.eastus2.azure.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_0RNDngqLAH2M",
  DB: "neondb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};