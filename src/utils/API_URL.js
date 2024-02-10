// export const LINK = process.env.HOST
const server = "production";

export const LINK =
  server !== "production"
    ? "http://localhost:8080/api"
    : "https://api.h-project.fun/api";
