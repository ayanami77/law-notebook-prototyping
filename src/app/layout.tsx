import { ColorModeScript, UIProvider } from "@yamada-ui/react"
import type { Metadata } from "next";
import { Header } from "./_components/Header";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <ColorModeScript />
        <UIProvider>
          <Header />
          <div>
            {children}
          </div>
        </UIProvider>
      </body>
    </html>
  );
}
