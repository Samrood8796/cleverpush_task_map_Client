import React, { useState } from 'react';
import axios from '../../../utils/axios';
import './style.css'
import {  editBlog } from '../../../utils/constants';
import {  setUpdateBlog } from '../../../state/userReducer';
import { useDispatch, useSelector } from 'react-redux';
const EditBlog = ({ setIsOpen, defaultDescription, defaultCategory, defaultTitle, id }) => {
    const [title, setTitle] = useState(defaultTitle);
    const [category, setCategory] = useState(defaultCategory);
    const [description, setDescription] = useState(defaultDescription);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.append("title",title);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("id", id);
        formData.append("userId", user._id);
       
        axios.put(editBlog, {title,category,description,id,"userId":user._id}).then((response) => {
            if (response.data) {
                console.log("response.edit --data");
                console.log(response.data);
                dispatch(setUpdateBlog({blog:response.data}))
                setLoading(false)
                setIsOpen(false)
            }
        })
    };

    return (
        <>
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">Submitting...</div>
                </div>
            )}
            <form onSubmit={handleSubmit} className='flex flex-col space-y-2 '>


                <div className='flex flex-col justify-start items-start border'>
                    <label htmlFor="title">Title:</label>
                    <input className='focus:outline-none' type="text" id="title" name="title"  value={title} onChange={(e)=>setTitle(e.target.value)} required />
                </div>

                <div className='flex flex-col justify-start items-start border'>
                    <label htmlFor="category">Category:</label>
                    <input className='focus:outline-none' type="text" id="category" name="category"  value={category} onChange={(e)=>setCategory(e.target.value)}  required />
                </div>
                <div className='flex flex-col justify-start items-start border'>
                    <label htmlFor="description">Description:</label>
                    <textarea className='focus:outline-none' id="description" name="description" value={description} onChange={(e)=>setDescription(e.target.value)}  required />
                </div>

                <button className='bg-black text-white my-3 p-2' type="submit">Submit</button>
            </form>
        </>
    );
};

export default EditBlog;