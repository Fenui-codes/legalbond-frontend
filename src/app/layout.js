import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LegalBond",
  description: "customary marriage registration and objection platform",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "LegalBond",
    description: "customary marriage registration and objection platform",
    url: "https://legalbond.example.com",
    siteName: "LegalBond",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LegalBond - Customary Marriage Registration",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LegalBond",
    description: "customary marriage registration and objection platform",
    images: ["/og-image.png"],
  },
  themeColor: "#2563eb",
  appleWebApp: {
    capable: true,
    title: "LegalBond",
    statusBarStyle: "default",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    me: "me-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}