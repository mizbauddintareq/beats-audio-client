import { useForm } from "react-hook-form";

const BookingModal = ({ product, setProduct }) => {
  const { name, categoryName, seller, img, price } = product;
  const date = new Date().toISOString().split("T")[0];

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setProduct(null);
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">{name}</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text dark:text-white">Name</span>
              </label>
              <input
                type="text"
                placeholder="User Name"
                className="input  w-full input-bordered"
                {...register("name")}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text dark:text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input w-full  input-bordered"
                {...register("email")}
              />
            </div>

            <div className="form-control w-full hidden">
              <label className="label">
                <span className="label-text dark:text-white">Product</span>
              </label>
              <input
                type="text"
                value={name}
                className="input w-full  input-bordered"
                {...register("product")}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text dark:text-white">Price</span>
              </label>
              <input
                type="text"
                value={price}
                className="input w-full  input-bordered"
                {...register("price")}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text dark:text-white">Date (Y/M/D)</span>
              </label>
              <input
                type="text"
                value={date}
                className="input w-full  input-bordered"
                {...register("date")}
              />
            </div>
            <div className="form-control w-full my-4">
              <input
                type="submit"
                value="Booked"
                className="btn w-full input-bordered"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
