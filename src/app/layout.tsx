import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import '@mysten/dapp-kit/dist/index.css';

export const metadata: Metadata = {
  title: {
    template: '%s - Bonjour',
    default:
      'Bonjour - Digital business cards for tech creators',
  },
  description:
    'Helping creators meet more people who are equally interesting or have opportunities at hand. But tell the world who you are first. Need a manual for potential friends, collaborators to understand you.',
  // alternates: {
  //   types: {
  //     'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
  //   },
  // },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
