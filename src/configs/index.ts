const config = {
  DB_URL: String(process.env.MAHAJONG_DB_URI),
  PORT: Number(process.env.SERVER_LISTEN_PORT),
  HASH_KEY: String(process.env.HASH_KEY),
  JWT_SECRET: String(process.env.JWTSECRET),
};

export default config;
