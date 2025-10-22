import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import NewArrivals from "./pages/NewArrivals.jsx";
import MensCloth from "./pages/MensCloths.jsx";
import WomensCloth from "./pages/WomensCloths.jsx";
import ChildrenCloths from "./pages/ChildrensCloth.jsx";
import Cart from "./pages/Cart.jsx";
import ProductProvide from "./Context/ProductContext.jsx";
import SingleProduct from "./pages/SingleProdoct.jsx";
import Login from "./pages/Login.jsx";
import FavCart from "./pages/FavCart.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <Home />,
        index: true,
      },

      {
        element: <About />,
        path: "/about",
      },
      {
        element: <Contact />,
        path: "/contact",
      },
      {
        element: <NewArrivals />,
        path: "/newArrivals",
      },
      {
        element: <MensCloth />,
        path: "/menCloths",
      },

      {
        element: <WomensCloth />,
        path: "/womenCloths",
      },
      {
        element: <ChildrenCloths />,
        path: "/childrenCloths",
      },
      {
        element: <Cart />,
        path: "/cart",
      },
      {
        element: <SingleProduct />,
        path: "/product/:id",
      },
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <FavCart />,
        path: "/favouritecart",
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ProductProvide>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </ProductProvide>
);
