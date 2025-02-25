import React from 'react'
import { useLocation, useParams } from 'react-router-dom';

const BlogDetailPage = () => {
    const { id } = useParams();
    const {pathname} = useLocation();
    console.log(id)

  return (
    <div className='max-w-6xl mx-auto px-4'>BlogDetailPage {id} - {pathname}</div>
  )
}

export default BlogDetailPage