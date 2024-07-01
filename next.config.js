/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['images.unsplash.com', 'res.cloudinary.com', 'vps.latelier22.fr']
    }
}

module.exports = nextConfig
