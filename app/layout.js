import '@/app/globals.css';
import localFont from 'next/font/local';

/* Cirka – load via Next.js so fonts work reliably */
const cirkaBold = localFont({
  src: '../assets/fonts/Cirka-Bold.woff2',
  weight: '700',
  variable: '--font-cirka-bold',
  display: 'swap',
});
const cirkaLight = localFont({
  src: '../assets/fonts/Cirka-Light.woff2',
  weight: '300',
  variable: '--font-cirka-light',
  display: 'swap',
});
const cirkaRegular = localFont({
  src: '../assets/fonts/Cirka-Regular.woff2',
  weight: '400',
  variable: '--font-cirka-regular',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://webarrays.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'WEBARRAYS | Software Agency & Website Solutions in Pakistan',
  description: 'WEBARRAYS is a leading software agency in Lahore, Pakistan. We build responsive websites, web applications, and custom software with React, Next.js, and React Native. Get a quote for your project.',
  keywords: ['software agency', 'website solutions', 'web development Pakistan', 'custom software', 'web design', 'React', 'Next.js', 'Lahore', 'Pakistan', 'web apps', 'full-stack development'],
  authors: [{ name: 'WEBARRAYS', url: siteUrl }],
  creator: 'WEBARRAYS',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'WEBARRAYS',
    title: 'WEBARRAYS | Software Agency & Website Solutions in Pakistan',
    description: 'Leading software agency in Lahore, Pakistan. Websites, web apps, and custom software solutions. React, Next.js, React Native.',
    images: [{ url: '/images/logo.png', width: 512, height: 512, alt: 'WEBARRAYS' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WEBARRAYS | Software Agency & Website Solutions in Pakistan',
    description: 'Software agency in Lahore. Websites, web apps, and custom software. React, Next.js.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
  },
  alternates: { canonical: siteUrl },
};

const siteBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://webarrays.com';
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteBase}#organization`,
      name: 'WEBARRAYS',
      url: siteBase,
      description: 'Software agency in Lahore, Pakistan providing website development, web applications, and custom software solutions. React, Next.js, React Native.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lahore',
        addressRegion: 'Punjab',
        addressCountry: 'PK',
        streetAddress: 'Opposite Garden Town, Barkat Market, Central Plaza',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+92-301-4749625',
        email: 'naqashahsan@gmail.com',
        contactType: 'customer service',
        areaServed: 'PK',
      },
      sameAs: [
        'https://www.instagram.com/ahsan_roomi/',
        'https://www.facebook.com/jutt9406/',
        'https://www.linkedin.com/in/muhammad-ahsan-iqbal-52618b182/',
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteBase}#service`,
      name: 'WEBARRAYS',
      description: 'Website development, web applications, and custom software in Pakistan.',
      provider: { '@id': `${siteBase}#organization` },
      areaServed: { '@type': 'Country', name: 'Pakistan' },
      serviceType: ['Website Development', 'Web Applications', 'Custom Software', 'React Native', 'Next.js'],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteBase}#website`,
      url: siteBase,
      name: 'WEBARRAYS',
      description: 'Software agency & website solutions in Lahore, Pakistan.',
      publisher: { '@id': `${siteBase}#organization` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cirkaBold.variable} ${cirkaLight.variable} ${cirkaRegular.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
