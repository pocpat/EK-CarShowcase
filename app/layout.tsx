import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Car Hub",
  description: "Discover the best cars in the world!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/ekLogo.png" />
        <title>Car Hub</title>
      </head>

      <body className="relative">
        <div>Testing Layout</div>

        {children}
      </body>
    </html>
  );
}
