import React, { useContext, useEffect, useState } from "react";

import { ProductContext } from "../Context/ProductContext";
import Layout from "../Shared/Layout/Layout";
import { RiDeleteBin3Fill, RiEditCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

import { ImCancelCircle } from "react-icons/im";
import Edit from "../Components/SingleProductcomponents/Edit";
import { baseUrl } from "../App";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

const Cart = () => {
  const { cartItems, cartcout, HandleDeleteCart, User, token } =
    useContext(ProductContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prod, setProd] = useState(null);
  const [selectedSize, setSetectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("prod:", prod);
    console.log("token:", token);
  }, [prod, token]);

  useEffect(() => {
    if (selectedSize) {
      setProd((prv) => ({ ...prv, size: selectedSize }));
    }
    if (selectedColor) {
      setProd((prv) => ({ ...prv, color: selectedColor }));
    }
    if (quantity) {
      setProd((prv) => ({ ...prv, quantity: quantity }));
    }
  }, [selectedColor, selectedSize, quantity]);

  const HandleInitializePayent = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${baseUrl}initializepayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token && token}`,
        },
        body: JSON.stringify({ email: User && User?.email }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("data:", data);
        setIsLoading(false);
        setTimeout(() => {
          toast.success(data?.message);
        }, 3000);
        window.location.href = data?.link;
      } else {
        console.log("data:", data);
        setIsLoading(false);
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <Layout>
      <div className="relative min-h-screen px-4 py-10 bg-white md:px-10 flexCol">
        {isLoading && (
          <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full gap-2 text-black bg-transWhite">
            <p className="text-2xl font-semibold">Loading</p>
            <PulseLoader />
          </div>
        )}
        <h1 className="mb-8 text-3xl font-bold text-center">Your Cart</h1>

        <div
          className={` ${
            isModalOpen ? "" : "hidden"
          } modal min-h-screen bg-transPrimary w-full absolute top-0 `}
        >
          <span
            onClick={() => setIsModalOpen(false)}
            className="absolute top-12 right-10 z-20 flexRow  rounded-full  bg-white text-primary border-[1px] border-primary hover:border-primary hover:bg-primary text-lg font-semibold hover:text-white transition ease-in-out duration-500 cursor-pointer"
          >
            <ImCancelCircle className="w-8 h-8" />
          </span>

          <Edit
            prod={prod}
            setSetectedSize={setSetectedSize}
            setSelectedColor={setSelectedColor}
            setQuantity={setQuantity}
            quantity={quantity}
          />
        </div>

        {cartItems && cartItems.length > 0 ? (
          <div className="overflow-x-auto">
            {/* Table wrapper for desktop */}
            <table className="hidden min-w-full border border-gray-200 shadow-sm md:table rounded-xl">
              <thead className="bg-gray-100">
                <tr className="text-left text-gray-700">
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr
                    key={index}
                    className="transition border-t hover:bg-gray-50"
                  >
                    <td className="flex items-center gap-3 px-4 py-3">
                      <img
                        src={item?.image || item?.product?.image}
                        alt={item?.name || item?.product?.name}
                        className="object-cover w-12 h-12 rounded-md"
                      />
                      <span className="font-medium">
                        {item?.name || item?.product?.name}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      ${item?.price || item?.product?.price}
                    </td>
                    <td className="px-4 py-3">{item?.quantity}</td>
                    <td className="px-4 py-3 font-semibold">
                      ${(item?.price || item?.product?.price) * item?.quantity}
                    </td>
                    <td className="flex justify-between gap-2 text-center">
                      <span
                        onClick={() => {
                          console.log("item:", item);

                          setIsModalOpen(true);
                          setProd(item);
                        }}
                        title="Edit"
                        className="px-2 py-1 text-white bg-black rounded-md cursor-pointer hover:bg-gray-800"
                      >
                        <RiEditCircleFill />
                      </span>
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          HandleDeleteCart(item?.id || item?.productid);
                        }}
                        title="Delete"
                        className="px-2 py-1 text-white bg-black rounded-md cursor-pointer hover:bg-gray-800"
                      >
                        <RiDeleteBin3Fill />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Card layout for mobile */}
            <div className="space-y-4 md:hidden">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 p-4 border border-gray-200 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image || item?.product?.image}
                      alt={item.name || item?.product?.name}
                      className="object-cover w-16 h-16 rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">
                        {item.name || item?.product?.name}
                      </h3>
                      <p className="text-gray-600">
                        ${item.price || item?.product?.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 text-sm">
                    <span>Quantity: {item.quantity}</span>
                    <span className="font-semibold">
                      Total:
                      {(item?.price || item?.product?.price) * item?.quantity}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      HandleDeleteCart(
                        prod?.id || prod?.product?.id || prod?.productid
                      );
                      console.log("prodd:", prod);
                    }}
                    className="w-full py-2 mt-2 text-white bg-black rounded-md hover:bg-gray-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="flex justify-end mt-6">
              <div className="w-full p-5 bg-gray-100 rounded-lg shadow-sm sm:w-1/2 md:w-1/3">
                <div className="flex justify-between mb-2 text-gray-700">
                  <span>Items in Cart:</span>
                  <span>{cartcout}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>
                    $
                    {cartItems
                      .reduce(
                        (sum, item) =>
                          sum +
                          (item.price || item?.product?.price) * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={(e) => HandleInitializePayent(e)}
                  className="w-full py-3 mt-5 font-semibold text-white transition bg-black rounded-md hover:bg-gray-800"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-600">
            <p className="mb-4 text-xl">Your cart is currently empty 🛒</p>
            <a
              href="/"
              className="px-5 py-2 text-white transition bg-black rounded-md hover:bg-gray-800"
            >
              Continue Shopping
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
