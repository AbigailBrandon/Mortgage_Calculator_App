import { Roboto } from "next/font/google"; // Import Roboto font
import "./globals.css";
import type { Metadata } from "next";

// Initialize Roboto with the correct subset for preloading
const customFont = Roboto({ style: 'normal', weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Mortgage Calculator App",
  description: "Easily calculate your mortgage payments",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title> Mortgage Calculator App </title> 
        <meta name="description"/> 
      </head>
      <body className={customFont.className}>
        <header>
        </header>
        <main>
          {children} 
        </main>
        <footer>
          <p>© {new Date().getFullYear()} Mortgage Calculator App. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
