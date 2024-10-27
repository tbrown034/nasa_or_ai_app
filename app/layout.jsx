import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./UI/Header";
import Footer from "./UI/Footer";
import { SessionProvider } from "next-auth/react";

// Inter for general use, applied globally
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="relative flex flex-col min-h-screen p-4 text-white bg-gradient-to-b from-indigo-950 via-blue-800 to-indigo-800">
        <SessionProvider>
          {/* Header */}
          <Header />

          {/* Main content */}
          <main className="flex-grow">
            {/* Specific areas use Audiowide */}
            <div>{children}</div>
          </main>

          {/* Footer */}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
