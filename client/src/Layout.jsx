import Header from "components/Header";
import Footer from "components/Footer";
import { Toaster } from "react-hot-toast";
export default function Layout({ children }) {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      {children}
      <Footer />
    </>
  );
}
