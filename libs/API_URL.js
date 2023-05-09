// export const LINK = process.env.HOST
const server = "repl";

export const LINK =
  server !== "repl"
    ? "http://localhost:8080"
    : "https://h-project-clf3.onrender.com";
