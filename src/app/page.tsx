"use client";

import Head from "next/head";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <main className="px-1 pb-10 pt-[45px] md:px-12">
      <Head>
        <title>Centsibility</title>{" "}
        {/* Ensure correct spelling of your app's name */}
        <meta
          name="description"
          content="Centsibility is a privacy-focused financial app that categorizes transactions from uploaded CSV files on-device, ensuring user data anonymity and discarding data post-processing without retention or backups."
        />
        {/* Recommended Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* Open Graph Tags for Social Media Sharing */}
        <meta property="og:title" content="Centsibility" />
        <meta
          property="og:description"
          content="Centsibility is a privacy-focused financial app that helps categorize transactions efficiently and securely."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="[Your website URL]" />
        <meta
          property="og:image"
          content="[URL of an image showcasing your app]"
        />
        {/* Additional tags like favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </main>
  );
}
