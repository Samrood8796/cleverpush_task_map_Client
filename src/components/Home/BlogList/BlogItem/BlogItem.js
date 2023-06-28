import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Chip from '../../../common/Chip/Chip';
import { BiSolidUserCircle } from 'react-icons/bi'
import './styles.css';
import { AiFillEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import toast, { Toaster } from 'react-hot-toast';
import axios from '../../../../utils/axios';
import { deleteBlog } from '../../../../utils/constants';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteBlog } from '../../../../state/userReducer';
import EditBlog from '../../EditBlog/EditBlog';
import Modal from '../../../common/Modal/Modal';
TimeAgo.addDefaultLocale(en)


const BlogItem = ({ blog: { description, title, createdAt, author, cover, category, _id, }, }) => {
  const timeAgo = new TimeAgo('en-US')
  const user = useSelector((state) => state.user)
  const [editBlog, setEditBlog] = useState(false)
  const dispatch = useDispatch()

  const handleDelete = (BlogId) => {
    const confirmed = window.confirm('Are you sure you want to delete?');
    if(!confirmed) return;
    axios.delete(`${deleteBlog}/${user._id}/${BlogId}`).then((response) => {
      dispatch(setDeleteBlog(response.data.id))
      toast.success(response.data.msg, {
        position: "top-cener",
      });
    })
  }
 const closeEditPage = () =>{
    setEditBlog(!editBlog)
  }
  return ( 
    <div className='blogItem-wrap bg-color'>
      <div className='flex justify-end space-x-2 text-xl'>

        <button onClick={closeEditPage}><AiFillEdit></AiFillEdit></button>
        {editBlog &&
          <Modal isOpen={editBlog} onClose={closeEditPage}>
            <h3 className="font-bold text-xl mb-2">Edit Blog</h3>
            <EditBlog setIsOpen={setEditBlog} defaultDescription={description} defaultCategory={category} defaultTitle={title} id={_id}/>
          </Modal>
        }
        <button onClick={()=>handleDelete(_id)}><MdDelete></MdDelete></button>
      </div>
      <img className='blogItem-cover' src={cover} alt='cover' />
      <Chip label={category} />
      <h3>{title}</h3>
      <p className='blogItem-desc'>{description}</p>
      <footer>
        <div className='blogItem-author'>
          {/* <img src={authorAvatar} alt='avatar' /> */}
          <BiSolidUserCircle className='text-4xl'></BiSolidUserCircle>
          <div>
            <h6>{author?.name}</h6>
            <p>{createdAt}</p>
          </div>
        </div>
        <Link className='blogItem-link' to={`/blog/${_id}`}>
          ➝
        </Link>
      </footer>
      <Toaster />
    </div>
  );
};

export default BlogItem;