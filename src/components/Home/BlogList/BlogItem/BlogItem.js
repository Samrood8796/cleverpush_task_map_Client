import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '../../../common/Chip/Chip';
import {BiSolidUserCircle} from 'react-icons/bi'
import './styles.css';

const BlogItem = ({
  blog: {
    description,
    title,
    createdAt,
    authorName, 
    cover,
    category,
    _id,
  },
}) => {
  return (
    <div className='blogItem-wrap bg-color'>
      <img className='blogItem-cover' src={cover} alt='cover' />
      <Chip label={category} />
      <h3>{title}</h3>
      <p className='blogItem-desc'>{description}</p>
      <footer>
        <div className='blogItem-author'>
          {/* <img src={authorAvatar} alt='avatar' /> */}
          <BiSolidUserCircle className='text-4xl'></BiSolidUserCircle>
          <div>
            <h6>{authorName}</h6>
            <p>{createdAt}</p>
          </div>
        </div>
        <Link className='blogItem-link' to={`/blog/${_id}`}>
          ➝
        </Link>
      </footer>
    </div>
  );
};

export default BlogItem;