import React, { use, useContext, useEffect } from "react";
import { ProductContext } from "../../Context/ProductContext";

function Test2() {

  const { user } = useContext(ProductContext);
  useEffect(() => {
    console.log("user:", user);
  }, []);
  return <div>Test2</div>;
}

export default Test2;
