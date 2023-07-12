/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      process.env.NEXT_PUBLIC_SERVER_URL.substring(
        process.env.NEXT_PUBLIC_SERVER_URL.indexOf("//") + 2,
        process.env.NEXT_PUBLIC_SERVER_URL.lastIndexOf(":")
      ),
      "res.cloudinary.com",
      "htm-serverless-dev-htmpictures-ccew211tm1op.s3.amazonaws.com",
      "htm-serverless-dev-htmpictures-ccew211tm1op.s3.us-east-1.amazonaws.com",
      "bruh-sound-effect-2-htm.s3.us-east-1.amazonaws.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/events",
        destination: "/events/page/1",
        permanent: false,
      },
      {
        source: "/blogs",
        destination: "/blogs/page/1",
        permanent: false,
      },
    ];
  },
};
