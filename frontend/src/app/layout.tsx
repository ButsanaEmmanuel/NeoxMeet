import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NeoxMeet',
  description: 'LiveKit-first meeting platform with AI features',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white`}>
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold">
              NeoxMeet
            </Link>
            <nav className="text-sm text-slate-300 flex gap-4">
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
              <Link href="/dashboard">Dashboard</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
