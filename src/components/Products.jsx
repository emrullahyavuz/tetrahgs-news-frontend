import React, { useEffect, useState } from "react";
import Cart from "./Cart/Cart";

const Products = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center mt-20 h-screen">
          <div className="w-14 h-14 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-5 py-4">
          {blogs.map((blog) => (
            <Cart
              key={blog.id}
              {...blog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
