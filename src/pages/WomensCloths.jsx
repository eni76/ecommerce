import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Context/ProductContext";
import { Link } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Layout from "../Shared/Layout/Layout";

const WomensCloths = () => {
  const [few, setFew] = useState(null);
  const [fewDisplay, setFewDisplay] = useState(true);
  const [women, setWomen] = useState(null);
  const { HandleGetProducts, productData, HandleAddFavouritrCart, HandleAddTCart } = useContext(ProductContext);

  useEffect(() => {
    HandleGetProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("productData:", productData);

    if (productData) {
      const found = productData?.filter((item) => item?.category === "women");
      if (found) {
        setWomen(found);
        const less = found?.slice(0, 3);
        console.log("less:", less);
        setFew(less);
      }
    }
  }, [productData]);
  return (
    <Layout>
      <div className="bg-white lg:pt-12 pt-2 pb-12">
        <p className="text-center text-primary text-2xl font-semibold w-full mt-8 ">
          Women's Cloth
        </p>
        <p className="text-center text-primary  w-full mt-2 text-lg">
          Stay cozy and stylish with our exclusive collections of best selling
          Hoodies
        </p>
        <div className=" px-4 md:px-10 lg:px-20 grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-16 gap-16 justify-center items-stretch lg:mt-6 mt-8">
          {fewDisplay ? (
            <>
              {few &&
                few?.map((few) => (
                  <div
                    to={`/product/${few?.id}`}
                    className="hover:shadow-2xl transition ease-in-out duration-500 rounded-md overflow-hidden "
                  >
                    <div className="w-full  h-[26rem]  overflow-hidden  ">
                      <Link
                        to={`/product/${few?.id}`}
                        className="w-full h-full"
                      >
                        <img
                          src={few?.image}
                          alt="Fashio"
                          className="  object-cover w-full h-full  "
                        />
                      </Link>
                    </div>
                    <div className="p-2">
                      <p className="text-black font-bold mt-2 ">{few?.name}</p>
                      <LinesEllipsis
                        className="text-black  mt-2 z-50"
                        text={few?.description}
                        maxLine="1"
                        ellipsis="..."
                        trimRight
                      />

                      <div className="flex justify-between items-center mt-2">
                        <span className="p-2 bg-primary text-white rounded-md">
                          ${few?.price}
                        </span>

                        <div className="flex justify-between items-center gap-4">
                          <span
                            onClick={() => HandleAddFavouritrCart(few)}
                            className="loveParent rounded-full cursor-pointer p-2 bg-white border-[1px] border-primary flex justify-center items-center  hover:bg-black hover:text-primary  transition ease-in-out duration-500"
                          >
                            <FaHeart className="h-6 w-6 love " />
                          </span>
                          <span
                            onClick={() =>
                              HandleAddTCart(
                                few,
                                1,
                                few?.defaultSize,
                                few?.defaultColor
                              )
                            }
                            className="loveParent rounded-full cursor-pointer p-2 bg-white border-[1px] border-primary flex justify-center items-center  hover:bg-black hover:text-primary  transition ease-in-out duration-500"
                          >
                            <FaShoppingCart className="h-6 w-6 love" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <>
              {women &&
                women?.map((best) => (
                  <div
                    to={`/product/${best?.id}`}
                    className="hover:shadow-2xl transition ease-in-out duration-500 rounded-md overflow-hidden "
                  >
                    <div className="w-full  h-[26rem]  overflow-hidden  ">
                      <Link
                        to={`/product/${best?.id}`}
                        className="w-full h-full"
                      >
                        <img
                          src={best?.image}
                          alt="Fashio"
                          className="  object-cover w-full h-full  "
                        />
                      </Link>
                    </div>
                    <div className="p-2">
                      <p className="text-black font-bold mt-2 ">{best?.name}</p>
                      <LinesEllipsis
                        className="text-black  mt-2 z-50"
                        text={best?.description}
                        maxLine="1"
                        ellipsis="..."
                        trimRight
                      />

                      <div className="flex justify-between items-center mt-2">
                        <span className="p-2 bg-primary text-white rounded-md">
                          ${best?.price}
                        </span>

                        <div className="flex justify-between items-center gap-4">
                          <span
                            onClick={() => HandleAddFavouritrCart(few)}
                            className="loveParent rounded-full cursor-pointer p-2 bg-white border-[1px] border-primary flex justify-center items-center  hover:bg-black hover:text-primary  transition ease-in-out duration-500"
                          >
                            <FaHeart className="h-6 w-6 love " />
                          </span>
                          <span
                            onClick={() =>
                              HandleAddTCart(
                                best,
                                1,
                                best?.defaultSize,
                                best?.defaultColor
                              )
                            }
                            className="loveParent rounded-full cursor-pointer p-2 bg-white border-[1px] border-primary flex justify-center items-center  hover:bg-black hover:text-primary  transition ease-in-out duration-500"
                          >
                            <FaShoppingCart className="h-6 w-6 love" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
        <div className="flexRow  mt-8">
          {fewDisplay ? (
            <span
              onClick={() => setFewDisplay(false)}
              className="rounded-md bg-white text-black border-2 border-primary cursor-pointer p-2"
            >
              See More
            </span>
          ) : (
            <span
              onClick={() => setFewDisplay(true)}
              className="rounded-md bg-white text-black  border-2 border-primary cursor-pointer p-2"
            >
              See Less
            </span>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WomensCloths;
