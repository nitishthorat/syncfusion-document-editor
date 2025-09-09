/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    '@syncfusion/ej2-react-documenteditor',
    '@syncfusion/ej2-documenteditor',
    '@syncfusion/ej2-base',
    '@syncfusion/ej2-buttons',
    '@syncfusion/ej2-popups',
    '@syncfusion/ej2-inputs'
  ],
}

module.exports = nextConfig