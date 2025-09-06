/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.com',
      },
      {
        protocol: 'https',
        hostname: '**.r2.dev', // Allows any subdomain under r2.dev
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/categories',
        destination: '/', // Replace with your desired slug
        permanent: true, // Use true for permanent redirects (301)
      },
    ];
  },
};

export default nextConfig;
