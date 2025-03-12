import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

function Layouts({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}

export default Layouts;
