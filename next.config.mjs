/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*',
          },
        ],
      },
=======
  images: {
    domains: ["cdn.sanity.io"],
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "media.battlexo.com",
      //   port: "",
      //   pathname: "/**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "sanityesports.live",
      //   port: "",
      //   pathname: "/**",
      // },
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
>>>>>>> c64d4052a8a28cb66fc7ed964cea672fd032d412
};

export default nextConfig;
