import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0,0%,5%)] via-background to-[hsl(0,0%,3%)] -z-10"></div>
      
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
