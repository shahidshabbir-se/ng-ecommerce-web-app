/** @type {import('next').NextConfig} */
import dotenv from "dotenv";

const nextConfig = {
  images: {
    domains: ['im.uniqlo.com', 'media.debenhams.com', 'media.boohoo.com', 'www.nastygal.com', 'mediahub.debenhams.com', 'mediahub.nastygal.co.uk']
  }
}

dotenv.config({ path: "../.env" });

export default nextConfig
