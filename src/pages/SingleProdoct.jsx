import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Context/ProductContext";
import { useParams } from "react-router-dom";
import Layout from "../Shared/Layout/Layout";
import Add from "../Components/SingleProductcomponents/Add";


const SingleProduct = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  const {
    productData,
    HandleGetProducts,
  } = useContext(ProductContext);

  useEffect(() => {
    if (!productData?.length > 0) {
      HandleGetProducts();
    }
  }, [HandleGetProducts, productData]);

  useEffect(() => {
    console.log("product:", product);
  }, [product]);
  
  useEffect(() => {
    if (productData?.length > 0) {
      const found = productData.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      setProduct(found);
      setSelectedColor(found?.defaultColor || "");
      setSelectedSize(found?.defaultSize || "");
    }
  }, [productData, id, setProduct, setSelectedColor, setSelectedSize]);

  // useEffect(() => {
  //   HandleUpdateCart(product);
  // }, [product, HandleUpdateCart]);

  if (!product) {
    return (
      <p className="text-center text-gray-500 mt-10">Loading product...</p>
    );
  }

  return (
    <Layout>
      <Add
        product={product}
        setSelectedSize={setSelectedSize}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </Layout>
  );
};

export default SingleProduct;