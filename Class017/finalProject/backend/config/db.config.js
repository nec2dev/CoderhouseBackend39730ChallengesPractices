import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  cookieSecret: process.env.COOKIE_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
};
