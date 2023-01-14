import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import Loader from "../../Shared/Loader/Loader";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      const res = await fetch(
        `https://beats-audio-server.vercel.app/my-orders?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  console.log(data);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Thumb</th>
              <th>Title</th>
              <th>Price</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((order, i) => (
              <tr key={order._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={order.image} alt="product-thumb" />
                    </div>
                  </div>
                </td>
                <td>{order.product}</td>
                <td>{order.price}</td>
                <td>
                  <button className="btn-sm btn btn-primary">Pay</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
