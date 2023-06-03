import Providers from "@/components/Providers";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Worker App",
  description:
    "This is a company dashboard web application built using Next.js 13, Tailwind CSS, and Next-Auth for authentication. The dashboard allows the company to manage and control various aspects of their system.",
  openGraph: {
    images: './opengraph-image.png',
  },
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} dark:bg-slate-900 dark:text-slate-100 transition-all`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};
export default RootLayout;
