/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      { source: '/internships', destination: '/careers', permanent: true },
      { source: '/offer-letter', destination: '/dashboard', permanent: false },
    ];
  },
};

export default nextConfig;
