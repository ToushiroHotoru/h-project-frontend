// export const LINK = process.env.HOST
const server = "repl";

export const LINK =
  server !== "repl"
    ? "http://localhost:8080"
    : "https://api.h-project.fun";