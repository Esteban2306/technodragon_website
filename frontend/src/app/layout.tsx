import type { Metadata } from 'next';
import { ReactQueryProvider } from '@/src/core/providers/react-query/ReactQueryProvider';
import { Audiowide, Bruno_Ace } from 'next/font/google';
import '../globals.css';
import { AuthProvider } from '../modules/auth/provider/AuthProvider';

const headingFont = Audiowide({
  weight: '400',
  variable: '--font-heading',
  subsets: ['latin'],
});

const bodyFont = Bruno_Ace({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'TechnoDragon',
  description:
    'Descubre portátiles, computadores, componentes y accesorios tecnológicos de alta calidad. En TechnoDragon ofrecemos venta, mantenimiento y soporte técnico especializado para personas y empresas.',
  keywords: [
    'portátiles',
    'computadores',
    'laptops',
    'servicio técnico',
    'mantenimiento de computadores',
    'tecnología',
    'hardware',
    'accesorios tecnológicos',
    'componentes PC',
    'reparación de computadores',
    'tienda tecnológica',
    'equipos de cómputo',
  ],

  authors: [{ name: 'TechnoDragon' }],

  creator: 'TechnoDragon',

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  metadataBase: new URL('https://technodragon.co'),

  openGraph: {
    title: 'TechnoDragon',
    description:
      'Tecnología, innovación y soporte profesional para hogares y empresas.',
    url: 'https://technodragon.co',
    siteName: 'TechnoDragon',
    locale: 'es_CO',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased `}
    >
      <body className="min-h-full flex flex-col">
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
