/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
}

const args = process.argv.slice(2); 

const basePathIndex = args.indexOf('--base-path'); 

if (basePathIndex !== -1 && basePathIndex + 1 < args.length) {
  const basePath = args[basePathIndex + 1];
  console.log(basePath);
  nextConfig.basePath = basePath;
  nextConfig.assetPrefix = `${basePath}/`;
  console.log(nextConfig)
} else {
  nextConfig.basePath = "";
  nextConfig.assetPrefix = "/";
  console.log('Base path not found.');
}


module.exports = nextConfig
