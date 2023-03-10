import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loader from "../../Shared/Loader/Loader";

const Categories = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(
        "https://beats-audio-server.vercel.app/categories"
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="md:w-11/12 mx-auto mt-16">
      <h1 className="text-center text-5xl font-bold uppercase my-6">
        Categories
      </h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        {data.map((category) => (
          <div className="card shadow-xl" key={category._id}>
            <figure className="px-10 pt-10">
              <img
                src={category.thumb}
                alt="categoryImg"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title uppercase">{category.categoryName}</h2>

              <div className="card-actions">
                <Link to={`products/category/${category.categoryName}`}>
                  <button className="btn btn-warning font-bold px-6">
                    See All
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
