// custom css
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/lib/css/global.css"

// react built-in components
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { memo } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("")
  console.log("Rendering <RootLayout/>.")

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="nk-container">

          {/** 头部和内容 */}
          <HeaderAndChildren children={children}/>

          <Footer/>
        </div>


      </body>
    </html>
  );
}

// ==================================================================================
export const metadata: Metadata = {
  title: "new code",
  description: "new code",
};

// ==================================================================================
import { Footer as FooterWithOutMemo } from "./ui/layout-root/footer";
const Footer = memo(FooterWithOutMemo);

import HeaderAndChildren from "./ui/layout-root/header-and-children";


