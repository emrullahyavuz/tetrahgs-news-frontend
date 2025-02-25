import React from 'react'
import { useParams } from 'react-router-dom';

const BlogDetailPage = () => {
    const { id } = useParams();
    console.log(id)

  return (
    <div>BlogDetailPage</div>
  )
}

export default BlogDetailPage