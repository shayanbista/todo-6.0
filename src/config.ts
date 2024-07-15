import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../.env" });

const config = {
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpiration: 10000,
    refreshTokenExpiration: 10000,
  },

  database: {
    client: process.env.DB_CLIENT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },

  testToken:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InN1cGVyYWRtaW4iLCJlbWFpbCI6InN1cGVyQGdtYWlsLmNvbSIsInBlcm1pc3Npb25zIjpbInVzZXJzLmdldCIsInVzZXJzLnBvc3QiLCJ1c2Vycy5wdXQiLCJ1c2Vycy5kZWxldGUiLCJ0YXNrcy5nZXQiLCJ0YXNrcy5wb3N0IiwidGFza3MucHV0IiwidGFza3MuZGVsZXRlIl0sInJvbGUiOiJTdXBlckFkbWluIiwiaWF0IjoxNzIxMDM0MzExLCJleHAiOjE3MjEwNDQzMTF9.frv5mEHI4jICYKEFfwq0CZETFLusfkytvOEpp0JTxyY",
};

export default config;
