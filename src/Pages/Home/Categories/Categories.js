import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loader from "../../Shared/Loader/Loader";

const Categories = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/categories");
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
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
                  <button className="btn btn-primary btn-sm">See All</button>
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
