// export const LINK = process.env.HOST
const server = "production";

export const LINK =
  server !== "production1"
    ? "http://localhost:8080"
    : "https://api.h-project.fun";
