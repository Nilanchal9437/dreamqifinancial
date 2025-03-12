import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";

async function NavBar() {
  return (
    <header className="bg-gray-800 sticky top-0 z-50 shadow-sm">
      <Container>
        <nav className="py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="logo" height={50} width={100} />
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default NavBar;
