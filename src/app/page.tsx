"use client";

import Head from "next/head";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <main className="px-1 pb-10 pt-[45px] md:px-12">
      <Head>
        <title>Centsibility</title>
        <meta
          name="description"
          content="Centsibility is a privacy-focused financial app that categorizes transactions from uploaded CSV files on-device, ensuring user data anonymity and discarding data post-processing without retention or backups."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </main>
  );
}
