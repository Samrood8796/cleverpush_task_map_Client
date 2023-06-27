import React from 'react';
import BlogItem from './BlogItem/BlogItem';
import './styles.css';

const BlogList = ({ blogs }) => {
  return (
    <div className='blogList-wrap p-2'>
      {blogs.map((blog) => (
        <BlogItem blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;