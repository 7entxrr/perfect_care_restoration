import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Perfect Care Restoration',
    short_name: 'Perfect Care Restoration',
    description: 'Luxury leather repair and restoration — shoes, bags, jackets, furniture, auto interiors.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#c5a059',
    icons: [
      {
        src: '/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
