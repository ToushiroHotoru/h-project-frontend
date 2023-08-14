/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "i.pinimg.com",
      "images.hdqwalls.com",
      "get.wallhere.com",
      "yandex.ru",
      "img10.reactor.cc",
      "h-project.toushirohotoru.repl.co",
      "api.h-project.fun",
      "localhost",
    ],
  },
};

module.exports = nextConfig;
