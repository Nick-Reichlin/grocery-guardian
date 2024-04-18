/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentExternalPackages: ['pdf2json'],
    }
};

export default nextConfig;
