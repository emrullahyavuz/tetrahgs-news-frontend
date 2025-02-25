import React from "react";
import { Link, useParams } from "react-router-dom";

const Cart = ({ id,title, category, image, description }) => {
  

  const date = new Date();
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const splittedDate = formattedDate.split(",");

  return (
    <Link to={`/blog/${id}`} className="block">
      <div className="max-w-sm rounded-2xl overflow-hidden my-2 border-gray-200 dark:border-[#181A2A] border-2 shadow-sm hover:shadow-lg transition-shadow duration-300">
        {/* Thumbnail Image */}
        <div className="relative w-full h-60 p-3 ">
          <img src={image} alt={title} className="w-full h-full object-cover"/>
        </div>

        {/* Card Content */}
        <div className="p-5">
          {/* Category Badge */}
          <span className="inline-block bg-indigo-100 text-[#4B6BFB] dark:bg-[#181A2A] text-sm font-light rounded-lg px-3 py-1 mb-3">
            {category}
          </span>

          {/* Title */}
          <h3 className="text-lg font-medium w-[90%] line-clamp-1 text-gray-900 leading-tight mb-3 dark:text-white">
            {title}
          </h3>

          {/* Author & Date */}
          <div className="flex items-center text-gray-500 text-sm">
            <div className="flex items-center space-x-2">
              <span className="line-clamp-1">{description}</span>
            </div>
            
          </div>
          <div className="blog-date border inline-block rounded-lg my-2 p-1 bg-gray-400 text-sm">
              {splittedDate.map((item, index) => {
                return (
                  <span key={index} className="mx-1">
                    {item}
                  </span>
                );
              })}
            </div>
        </div>
      </div>
    </Link>
  );
};

export default Cart;
