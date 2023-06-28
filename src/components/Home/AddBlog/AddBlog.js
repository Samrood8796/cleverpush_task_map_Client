import React, { useContext, useReducer, useState } from 'react';
import './style.css'
import axios from '../../../utils/axios';
import { addBlog } from '../../../utils/constants';
import { setSingleBlog } from '../../../state/userReducer';
import { useDispatch, useSelector } from 'react-redux';
const AddBlog = ({ setIsOpen }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [cover, setCover] = useState('');
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const formdata = new FormData()
        formdata.append("myFile", cover)
        formdata.append("title", title)
        formdata.append("category", category)
        formdata.append("description", description)
        formdata.append("id", user._id)
        axios.post(addBlog, formdata).then((response) => {
            if (response.data) {
                console.log("response.data");
                console.log(response.data);
                console.log("response.data");
                dispatch(setSingleBlog(response.data))
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
                    <input className='focus:outline-none' type="text" id="title" name="title" onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className='flex flex-col justify-start items-start border'>
                    <label htmlFor="category">Category:</label>
                    <input className='focus:outline-none' type="text" id="category" name="category" onChange={(e) => setCategory(e.target.value)} required />
                </div>
                <div className='flex flex-col justify-start items-start border'>
                    <label htmlFor="description">Description:</label>
                    <textarea className='focus:outline-none' id="description" name="description" onChange={(e) => setDescription(e.target.value)} required />
                </div>


                {/* <div className='flex flex-col justify-start items-start border'>
                <label htmlFor="authorAvatar">Author Avatar:</label>
                <input className='focus:outline-none' type="file" id="authorAvatar" name="authorAvatar" value={formData.authorAvatar} onChange={handleChange} required />
            </div> */}

                <div className='flex flex-col justify-start items-start border'>
                    <label htmlFor="cover">Cover:</label>
                    <input className='focus:outline-none' type="file" id="cover" name="cover" onChange={(e) => setCover(e.target.files[0])} required />
                </div>

                <button className='bg-black text-white my-3 p-2' type="submit">Submit</button>
            </form>
        </>
    );
};

export default AddBlog;