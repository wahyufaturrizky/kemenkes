import type { Metadata } from "next";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import StoreProvider from "./StoreProvider";
import { Suspense } from "react";
import Loading from "./loading";
import { archivo } from "@/assets/fonts";

export const metadata: Metadata = {
  title: "SatuSehat",
  description: "Application dashboard SatuSehat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={archivo.className}>
        <StoreProvider>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </StoreProvider>
      </body>
    </html>
  );
}
