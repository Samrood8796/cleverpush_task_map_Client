import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../utils/axios';
import { getPlaces } from '../../utils/constants';
import { BiWorld } from 'react-icons/bi'
import { setLocation } from '../../state/userReducer';
import { useNavigate } from 'react-router-dom';
const PlaceTable = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [places, setPlaces] = useState([])
    const getPlacesData = async () => {
        try {
            let response = await axios.get(`${getPlaces}/${user._id}`)
            if (response) {
                setPlaces(response.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getPlacesData()
    }, [])
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-dark-purple dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        No
                    </th>
                    <th scope="col" className="px-6 py-3">
                        title
                    </th>
                    <th scope="col" className="px-6 py-3">
                        description
                    </th>
                    <th scope="col" className="px-6 py-3">
                        latitude
                    </th>
                    <th scope="col" className="px-6 py-3">
                        longitude
                    </th>
                    <th scope="col" className="px-6 py-3">
                        location
                    </th>
                </tr>
            </thead>
            {places.length !== 0 ?
            <tbody className='overflow-scroll'>
                {places.map((place, index) => (
                    <tr className="  border-b dark:bg-[#efefef] text-black dark:border-gray-700 " key={place._id}>
                        <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black">
                            {index}
                        </th>
                        <td className="px-6 py-4 w-36">
                            {place.title}
                        </td>
                        <td className="px-6 py-4 w-36">
                            {place.description}
                        </td>
                        <td className="px-6 py-4 w-36">
                            {place.lat}
                        </td>
                        <td className="px-6 py-4">
                            {place.lng}
                        </td>
                        <td >
                            <button onClick={() => {
                            dispatch(setLocation({ lat: place.lat, lng: place.lng }))
                            navigate('/')
                            }} className="px-6 text-3xl py-4 ">
                            <BiWorld />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        :
        <h1 className='text-xl '>
            NO data found...
        </h1>
        }
        </table> 
    );
};
export default PlaceTable;