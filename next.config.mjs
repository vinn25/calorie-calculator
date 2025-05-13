/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
    productionBrowserSourceMaps: false,
    eslint: {
        dirs: ['src', 'test'],
    },
    images: {
        domains: ['', ''],
    },
};

export default nextConfig;
