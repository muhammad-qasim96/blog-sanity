/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  plugins: [require("prettier-plugin-tailwindcss")],
  images: {
    domains: ["miro.medium.com", "cdn.pixabay.com"],
  },
};
