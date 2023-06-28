import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Chip from '../../components/common/Chip/Chip';
import './styles.css';
import { Link } from 'react-router-dom';
import EmptyList from '../../components/common/EmptyList/EmptyList';
import { useSelector } from 'react-redux';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const blogList = useSelector((state)=>state.blogs)
  console.log(blogList);
  useEffect(() => { 
    let blog = blogList.find((blog) => blog._id == id);
    console.log(blog);
    if (blog) {
      setBlog(blog); 
    }
  }, []);

  return (
    <>
      <Link className='blog-goBack' to='/'>
        <span> &#8592;</span> <span>Go Back</span>
      </Link>
      {blog ? (
        <div className='blog-wrap'>
          <header>
            <p className='blog-date'>Published {blog.createdAt}</p>
            <h1>{blog.title}</h1>
            <div className='blog-subCategory'>     
            </div>
          </header>
          <img src={blog.cover} alt='cover' />
          <p className='blog-desc'>{blog.description}</p>
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default Blog;