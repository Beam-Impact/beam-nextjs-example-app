import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "./components/nav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beam Next App",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-row gap-4 m-10`}>
        <nav className="m-4 ph-2">
          <Nav />
        </nav>
        <main className="p-4 mt-2">{children}</main>
      </body>
    </html>
  );
}
