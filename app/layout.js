import { Cinzel_Decorative, Cinzel, EB_Garamond } from "next/font/google";
import "./globals.css";

const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-display",
});

const cinzel = Cinzel({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ui",
});

const ebGaramond = EB_Garamond({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-body",
});

const title = "Sage — by Cognition & Chaos";
const description =
  "Your writing coach. Voice and text coaching that finds your voice, never replaces it.";

export const metadata = {
  metadataBase: new URL("https://sage.soulogos.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://sage.soulogos.com",
    siteName: "Sage",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${cinzelDecorative.variable} ${cinzel.variable} ${ebGaramond.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
