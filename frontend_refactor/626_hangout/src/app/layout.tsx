import type { Metadata } from "next";
import "./globals.css";
import { Federant, Fauna_One } from 'next/font/google'
import CssBaseline from '@mui/material/CssBaseline';

const federant = Federant({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-federant'
})
const faunaOne = Fauna_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fauna-one'
})


export const metadata: Metadata = {
  title: "626 Hangout",
  description: "Discover and connect with events, places, and people in the 626, San Gabriel Valley area.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CssBaseline />

      <body className={`${federant.variable} ${faunaOne.variable}`}>
        <div className="banner">
          This is a site-wide banner
        </div>
        <main> {children} </main>

        {/* TODO: Maybe add footer here */}
      </body>
    </html>
  );
}
