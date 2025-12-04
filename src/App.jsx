import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProductContext } from "./Context/ProductContext";
import { DotLoader } from "react-spinners";

// import { ProductProvider } from "./Context/ProductContext";

export const baseUrl = "https://ecombackend-ihay.onrender.com/";

function App() {
  const { loading, setLoading } = useContext(ProductContext);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen loading-spinner">
          <DotLoader />
          <p className="font-serif text-2xl italic font-bold logo"> Granduer</p>
        </div>
      ) : (
        <>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            pauseOnHover
            theme="colored" // optional, adds nice look
          />
          <Outlet />
        </>
      )}
    </>
  );
}

export default App;
