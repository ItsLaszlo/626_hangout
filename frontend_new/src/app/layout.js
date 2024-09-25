import './globals.css';
import { Federant, Fauna_One } from 'next/font/google';

const federant = Federant({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-federant',
});
const faunaOne = Fauna_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fauna-one',
});

export const metadata = {
  title: '626 Hangout',
  description:
    'Discover and connect with events, places, and people in the 626, San Gabriel Valley area.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${federant.variable} ${faunaOne.variable}`}>
        {children}
      </body>
    </html>
  );
}
