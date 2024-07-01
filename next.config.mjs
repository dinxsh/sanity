/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.battlexo.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sanityesports.live",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
