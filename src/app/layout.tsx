import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mortgage Broker Services | DreamQi Financial",
  description:
    "Tailored mortgage broker services, including home loans, refinancing, and Islamic banking. Flexible solutions for your financial journey.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
