import Footer from "../Navigations/Footer";
import Navbar from "../Navigations/Navbar";

const Layout = ({children}) => {
  return (
    <div >
      <Navbar />
      {children}
      <Footer/>
    </div>
  );
};

export default Layout;
