import { useContext } from "react";

import { AuthContext } from "../context/AuthProvider";
import { successAlert } from "./successAlert";

const BookingModal = ({ product, setProduct }) => {
  const { name, image, resalePrice } = product;
  const { user } = useContext(AuthContext);

  const handleBooking = (e) => {
    e.preventDefault();

    const form = e.target;

    const buyerName = form.name.value;
    const email = form.email.value;
    const product = form.product.value;
    const price = form.price.value;
    const phone = form.phone.value;
    const location = form.location.value;

    const bookingInfo = {
      buyerName,
      email,
      product,
      price,
      phone,
      location,
      image,
    };
    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          successAlert("Booking Confirmed");
          setProduct(null);
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative dark:bg-slate-900 dark:text-white">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle dark:bg-white dark:text-slate-900 bg-slate-900 absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold dark:text-secondary">{name}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-8"
          >
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              disabled
              className="input w-full input-bordered "
            />

            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              disabled
              className="input w-full  input-bordered "
            />
            <input
              type="text"
              name="product"
              defaultValue={name}
              disabled
              className="input w-full  input-bordered "
            />
            <input
              type="text"
              name="price"
              defaultValue={resalePrice}
              disabled
              className="input w-full  input-bordered "
            />

            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              className="input w-full"
            />
            <input
              type="text"
              name="location"
              placeholder="Meeting location"
              className="input w-full"
            />

            <input
              type="submit"
              value="booked"
              className="input btn btn-warning  w-full input-bordered"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
