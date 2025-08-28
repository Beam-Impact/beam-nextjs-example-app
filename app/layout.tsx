import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Nav from "./common/nav";
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
      <body className={`${openSans.className} flex flex-row gap-4 m-10`}>
        <nav className="m-4 ph-2 min-w-[250px]">
          <Nav />
        </nav>
        <main className="p-4 mt-2">{children}</main>
      </body>
    </html>
  );
}
