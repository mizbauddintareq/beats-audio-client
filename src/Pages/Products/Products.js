import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import BookingModal from "../../utilities/BookingModal";
import Product from "../Product/Product";

const Products = () => {
  const [product, setProduct] = useState(null);
  const data = useLoaderData();

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
      {data?.map((product) => (
        <Product key={product._id} product={product} setProduct={setProduct} />
      ))}

      {product && <BookingModal product={product} setProduct={setProduct} />}
    </div>
  );
};

export default Products;
