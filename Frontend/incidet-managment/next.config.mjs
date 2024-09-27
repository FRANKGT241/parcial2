/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'http',
              hostname: 'localhost',
              port: '3000',  // Asegúrate de que este sea el puerto correcto de tu servidor
              pathname: '/uploads/**', // Esto asegura que cualquier imagen en la ruta /uploads sea permitida
          },
      ],
  },
};

export default nextConfig;
