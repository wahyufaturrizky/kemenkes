import type { Metadata } from "next";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import StoreProvider from "./StoreProvider";
import { Suspense } from "react";
import Loading from "./loading";
import { archivo } from "@/assets/fonts";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Providers } from "./providers";

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
        <Providers>
          <StoreProvider>
            <Suspense fallback={<Loading />}>
              <AntdRegistry>{children}</AntdRegistry>
            </Suspense>
          </StoreProvider>
        </Providers>
      </body>
    </html>
  );
}
