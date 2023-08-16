/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
module.exports = {
    webpack: (config) => {
        // 'canvas' 패키지를 불러오는 부분을 제외하는 설정
        config.externals = {
            canvas: 'canvas',
        };
        return config;
    },
};