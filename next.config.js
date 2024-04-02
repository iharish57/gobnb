

// /**
//  * @type {import('next').NextConfig}
//  */
// const nextConfig = {
//     experimental: {
//     },
//     images:{
//         remotePatterns: [
//             {
//               protocol: 'https',
//               hostname: 'res.cloudinary.com',
//               pathname: '**',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'avatars.githubusercontent.com',
//                 pathname: '**',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'lh3.googleusercontent.com',
//                 pathname: '**',
//             },

//           ],
        
//     }
//   }
   
//   module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'res.cloudinary.com', 
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com'
    ]
  }
}

module.exports = nextConfig