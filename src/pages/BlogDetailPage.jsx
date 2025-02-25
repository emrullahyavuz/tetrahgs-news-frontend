import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(blog)

  useEffect(() => {
    // Blog detaylarını fetch etme
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-14 h-14 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return <div className="max-w-6xl mx-auto px-4 py-16">Blog not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <div className="flex items-center space-x-4 mb-4">
        <span className="text-gray-500">{new Date().toLocaleDateString()}</span>
        <div className="flex items-center">
          <span className="text-yellow-500 mr-1">★</span>
          <span>{blog.rating.rate}</span>
          <span className="text-gray-500 ml-2">({blog.rating.count} reviews)</span>
        </div>
      </div>
      <img src={blog.image} alt={blog.title} className="w-[50%] h-auto rounded-lg shadow-md mb-8" />
      <div className="prose dark:prose-dark border inline-block p-2 mb-8 rounded-lg bg-[#F7A91E] text-[#231F20]">
        <p>{blog.category}</p>
      </div>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{blog.description}</p>
      
    </div>
  );
};

export default BlogDetailPage;