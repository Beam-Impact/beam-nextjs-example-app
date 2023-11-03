import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Nav from "./components/nav";
import "./globals.css";

const openSans = Open_Sans({ subsets: ["latin"] });

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={"anonymous"}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${openSans.className} flex flex-row gap-4 m-10`}>
        <nav className="m-4 ph-2 min-w-[250px]">
          <Nav />
        </nav>
        <main className="p-4 mt-2">{children}</main>
      </body>
    </html>
  );
}
