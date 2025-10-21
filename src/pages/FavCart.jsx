import React, { useContext, useState } from "react";
import Layout from "../Shared/Layout/Layout";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { ImCancelCircle } from "react-icons/im";
import Edit from "../Components/SingleProductcomponents/Edit";
import { ProductContext } from "../Context/ProductContext";

const FavCart = () => {
  const { favoriteItem, HandleDeleteFavorite } = useContext(ProductContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prod, setProd] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
   const [quantity, setQuantity] = useState(1);
    useEffect(() => {
      console.log("prod:", prod);
    }, [prod]);

  return (
    <Layout>
      <div className="min-h-screen bg-white py-10 px-4 md:px-10 relative flexCol">
        <h1 className="text-3xl font-bold text-center mb-8">Your Favorites</h1>

        {/* Modal for editing favorite item */}
        <div
          className={` ${isModalOpen ? "" : "hidden"} modal min-h-screen bg-transPrimary w-full absolute top-0 `}
        >
          <span
            onClick={() => setIsModalOpen(false)}
            className="absolute top-12 right-10 z-20 flexRow rounded-full bg-white text-primary border-[1px] border-primary hover:border-primary hover:bg-primary text-lg font-semibold hover:text-white transition ease-in-out duration-500 cursor-pointer"
          >
            <ImCancelCircle className="h-8 w-8" />
          </span>

          <Edit
            prod={prod}
            setSelectedSize={setSelectedSize}
            setSelectedColor={setSelectedColor}
            quantity={1}
          />
        </div>

        {favoriteItem && favoriteItem.length > 0 ? (
          <div className="overflow-x-auto">
            {/* Desktop Table View */}
            <table className="hidden md:table min-w-full border border-gray-200 rounded-xl shadow-sm">
              <thead className="bg-gray-100">
                <tr className="text-left text-gray-700">
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {favoriteItem.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50 transition">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={item?.image}
                        alt={item?.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <span className="font-medium">{item?.name}</span>
                    </td>
                    <td className="py-3 px-4">${item?.price}</td>
                    <td className="text-center flex justify-between gap-2">
                      <span
                        onClick={() => {
                          setIsModalOpen(true);
                          setProd(item);
                        }}
                        title="Edit"
                        className="bg-black text-white px-2 py-1 rounded-md hover:bg-gray-800 cursor-pointer"
                      >
                        Edit
                      </span>
                      <span
                        onClick={() => HandleDeleteFavorite(item?.id)}
                        title="Delete"
                        className="bg-black text-white px-2 py-1 rounded-md hover:bg-gray-800 cursor-pointer"
                      >
                        <RiDeleteBin3Fill />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card View */}
            <div className="space-y-4 md:hidden">
              {favoriteItem.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => HandleDeleteFavorite(item?.id)}
                    className="mt-2 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                  >
                    Remove from Favorites
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-600">
            <p className="text-xl mb-4">You haven't added any favorites yet ❤️</p>
            <a
              href="/"
              className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Browse Products
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FavCart;