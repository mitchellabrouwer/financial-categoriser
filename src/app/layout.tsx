import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Centsibility Online",
  description:
    "The Centsibility Online is a privacy-focused financial app that categorizes transactions from uploaded CSV files on-device, ensuring user data anonymity and discarding data post-processing without retention or backups.",
  viewport: "width=device-width, initial-scale=1",
  metadataBase: new URL("https://financial-categoriser.vercel.app/"),
  openGraph: {
    title: "Centsibility",
    description:
      "Centsibility is a privacy-focused financial app that helps categorize transactions efficiently and securely.",
    type: "website",
    url: "https://financial-categoriser.vercel.app/",
    images: "/images/screenshot.png",
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
