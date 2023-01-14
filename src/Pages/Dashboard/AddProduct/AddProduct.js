import { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { successAlert } from "../../../utilities/successAlert";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const imageHostKey = process.env.REACT_APP_imageBB_key;

  const date = new Date(Date.now()).toLocaleString().split(",")[0];
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        const product = {
          name: data.title,
          category: data.category,
          buyingPrice: data.buyingPrice,
          resalePrice: data.resalePrice,
          condition: data.condition,
          image: imgData.data.url,
          yearsOfPurchase: data.yearsOfPurchase,
          yearsOfUse: data.yearsOfUse,
          details: data.details,
          postedDate: data.postedDate,
          seller: data.seller,
          status: "available",
        };

        // save doctors info to db
        fetch("https://beats-audio-server.vercel.app/products", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(product),
        })
          .then((res) => res.json())
          .then((data) => {
            successAlert("Product added successful");
            navigate("/dashboard/my-product");
            reset();
          });
      });
  };

  useEffect(() => {
    fetch("https://beats-audio-server.vercel.app/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <section className="my-16">
      <div className="lg:w-5/12 w-full mx-auto dark:bg-accent">
        <div className="shadow-xl rounded-xl p-6">
          <h3 className="text-xl text-center font-bold">
            Please add a product
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <input
                type="text"
                placeholder="Product title"
                className="input w-full input-bordered"
                {...register("title")}
              />
            </div>

            <div className="form-control w-full my-3">
              <select
                className="select select-bordered"
                {...register("category")}
              >
                <option selected value="" disabled>
                  Select Category
                </option>
                {categories?.map((category) => (
                  <option value={category.categoryName} key={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <input
                type="text"
                placeholder="Buying Price"
                className="input w-full input-bordered"
                {...register("buyingPrice")}
              />
            </div>

            <div className="form-control w-full my-3">
              <input
                type="text"
                placeholder="Resale Price"
                className="input w-full input-bordered"
                {...register("resalePrice")}
              />
            </div>

            <div className="form-control w-full">
              <select
                className="select select-bordered"
                {...register("condition")}
              >
                <option selected value="" disabled>
                  Select Condition
                </option>
                <option defaultValue="good">Good</option>
                <option defaultValue="fair">Fair</option>
                <option defaultValue="excellent">Excellent</option>
              </select>
            </div>

            <div className="form-control w-full my-3">
              <input
                type="file"
                className=" file-input file-input-bordered file-input-secondary  dark:bg-accent dark:text-white dark:border-white w-full"
                {...register("img")}
              />
            </div>

            <div className="form-control w-full">
              <input
                type="text"
                placeholder="Year of purchase"
                className=" input input-bordered w-full"
                {...register("yearsOfPurchase")}
              />
            </div>

            <div className="form-control w-full my-3">
              <input
                type="text"
                placeholder="Year of use"
                className=" input input-bordered w-full"
                {...register("yearsOfUse")}
              />
            </div>

            <div className="form-control w-full">
              <textarea
                {...register("details")}
                className="textarea w-full textarea-bordered"
                placeholder="Product Details"
              ></textarea>
            </div>

            <div className="form-control w-full mt-3">
              <input
                type="text"
                value={date}
                className=" input input-bordered w-full"
                {...register("postedDate")}
              />
            </div>

            <div className="form-control w-full my-3">
              <input
                type="text"
                value={user?.email}
                className=" input input-bordered w-full"
                {...register("seller")}
              />
            </div>

            <div className="form-control w-full my-4">
              <input
                type="submit"
                value="Add"
                className="btn btn-accent dark:bg-slate-900 w-full input-bordered"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
