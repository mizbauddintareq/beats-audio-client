const BookingModal = ({ product, setProduct }) => {
  const { name, categoryName, seller, img } = product;

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
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
