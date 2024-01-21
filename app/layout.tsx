import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "dOMP",
  description:
    "A decentralized app for online market place where sellers/businesses can put their product online and customers can buy those. The main authentication process of Seller or Customer and the procduct itself is done by Blockchain Smart Contract System.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
