const Product = ({ product, setProduct }) => {
  const {
    buyingPrice,
    condition,
    details,
    image,
    name,
    postedDate,
    resalePrice,
    seller,
    yearsOfPurchase,
    yearsOfUse,
  } = product;
  return (
    <div>
      <div className="card h-full shadow-xl">
        <figure>
          <img src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {name}

            <div className="badge badge-secondary">{condition}</div>
          </h2>
          <div>
            <h3 className="text-xl font-semibold">Price: ${resalePrice}</h3>
            <p>{details}</p>
            <p>
              <span className="font-semibold">Buying Price:</span> {buyingPrice}
            </p>

            <p>
              <span className="font-semibold">Seller:</span> {seller}
            </p>
            <p>
              <span className="font-semibold">Posted Date:</span> {postedDate}{" "}
              <span className="font-semibold">Purchase Year:</span>{" "}
              {yearsOfPurchase}{" "}
              <span className="font-semibold">{yearsOfUse}</span> Years Use
            </p>
          </div>
          <div className="card-actions justify-end">
            <div>
              <label
                className="btn btn-primary"
                htmlFor="booking-modal"
                onClick={() => setProduct(product)}
              >
                book now
              </label>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default Product;
