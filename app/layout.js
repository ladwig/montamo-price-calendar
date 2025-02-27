import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Montamo Preiskalender | Wärmepumpen",
  description: "Finden Sie den besten Preis für Ihre Wärmepumpe von Montamo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
