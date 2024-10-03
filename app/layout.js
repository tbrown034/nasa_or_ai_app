import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Header from "./UI/Header"; // Import your Header
import Footer from "./UI/Footer"; // Import your Footer
import { SessionProvider } from "next-auth/react"; // Import SessionProvider for authentication

// Inter for general use
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="relative flex flex-col min-h-screen p-4 text-white bg-gradient-to-b from-indigo-900 via-blue-800 to-indigo-900">
        <SessionProvider>
          {/* Header */}
          <Header />

          {/* Main content */}
          <main className="flex-grow">{children}</main>

          {/* Footer */}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
