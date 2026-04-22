import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Lynn el Moussaoui | Applied AI Engineer',
  description: 'Applied AI Engineer · Software · Mathematics · Research · Workshops · Writing',
  metadataBase: new URL('https://www.lynnelmoussaoui.me'),
  openGraph: {
    title: 'Lynn el Moussaoui',
    description: 'Applied AI Engineer · Software · Mathematics · Research · Workshops · Writing',
    url: 'https://www.lynnelmoussaoui.me',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lynn el Moussaoui',
    description: 'Applied AI Engineer · Software · Mathematics · Research · Workshops · Writing',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className={fontHeading.variable}>
        {children}
      </body>
    </html>
  )
}
