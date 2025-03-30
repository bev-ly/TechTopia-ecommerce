// @ts-check
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // Optional: Add runtime caching
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "offlineCache",
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js config
};

module.exports = withPWA(nextConfig);