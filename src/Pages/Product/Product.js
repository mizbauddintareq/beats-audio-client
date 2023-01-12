const Product = ({ product, setProduct }) => {
  const { name, categoryName, seller, img } = product;
  return (
    <div>
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img src={img} alt="product-img" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{categoryName}</p>
          <p>{seller}</p>
          <div className="card-actions justify-end">
            <label
              htmlFor="booking-modal"
              className="btn btn-primary"
              onClick={() => setProduct(product)}
            >
              book now
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
