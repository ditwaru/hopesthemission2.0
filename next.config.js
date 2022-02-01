/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      process.env.NEXT_PUBLIC_STRAPI_URL.substring(
        process.env.NEXT_PUBLIC_STRAPI_URL.indexOf('//') + 2,
        process.env.NEXT_PUBLIC_STRAPI_URL.lastIndexOf(':')
      ),
    ],
  },
};
