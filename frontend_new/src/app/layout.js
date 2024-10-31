import "../styles/global.css";
import { Federant, Fauna_One, Roboto } from "next/font/google";
import ClientLayout from "./ClientLayout";

const federant = Federant({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-federant",
});
const faunaOne = Fauna_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fauna-one",
});
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata = {
  // Brower tab info
  title: "626 Hangout",
  description:
    "Discover and connect with events, places, and people in the 626, San Gabriel Valley area.",
  viewport: "width=device-width, initial-scale=1", // Page renders at proper device width
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${federant.variable} ${faunaOne.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
// Purpose: Wraps all pages and sets up the base HTML
// ToDo: Maybe add error boundary to handle JS errors / white screen
