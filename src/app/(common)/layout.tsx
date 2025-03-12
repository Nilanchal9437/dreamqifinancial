import Layouts from "@/layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layouts>{children}</Layouts>;
}
