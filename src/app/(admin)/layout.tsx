import MainLayout from "@/components/MainLayout";
import useUser from "@/hook/cookies";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await useUser();

  return <MainLayout user={user}>{children}</MainLayout>;
}
