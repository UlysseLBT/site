import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  env: {
    ZOOM_ACCOUNT_ID: "LybRLNleRWePp5iK6jDS1A",
    ZOOM_CLIENT_ID: "b0_NJ2ggRCi1vAw7U2GtMg",
    ZOOM_CLIENT_SECRET: "0SHrvEroTR7YaunkucYDA03mbP8qEglV",
    DATABASE_URL: "postgresql://neondb_owner:npg_CAt3LFB9oKXg@ep-spring-fire-adiaihd9.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require",
    GMAIL_USER: "lebouteiller.ulysse@gmail.com",
    GMAIL_PASS: "ansb hkly zupy sjop",
  },
};

export default nextConfig;