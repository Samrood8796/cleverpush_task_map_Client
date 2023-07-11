import React, { useState } from 'react';
import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../state/userReducer';
import Geocoder from '../Mapbox/Geocoder';
import { addPlace } from '../../utils/constants';
import toast, { Toaster } from 'react-hot-toast';

import axios from '../../utils/axios';
const AddPlaceForm = ({ setshowForm }) => {
    const { lat, lng } = useSelector((state) => state.location)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [place, setPlace] = useState({
        title: '',
        description: '',
        latitude: lat,
        longitude: lng,
        id:user?._id
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPlace((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // using a POST request
        axios.post(addPlace,`${JSON.stringify(place)}`,{
            headers: { "Content-Type": "application/json" },
        }).then((response) => {
          console.log('Place added successfully:', response.data);
          toast.success("Place added successfully", {
            position: "top-right",
        });
        setTimeout(()=>{
            setshowForm(false)
            window.location.reload()
        },1000)
        })
        .catch((error) => {
          console.error('Error adding place:', error);
          toast.error(error?.response?.data?.msg, {
            position: "top-right",
        });
        });
      };
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-50">
                <div className="w-3/4 md:w-full max-w-md mx-auto mt-16">
                    {/* Modal content */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-bold mb-4">Add Place</h2>

                        <form onSubmit={handleSubmit} className='flex flex-col m-2 mt-3  gap-2 '>
                            <input
                                className='focus:outline-none border p-2'
                                type="text"
                                name="title"
                                value={place.title}
                                onChange={handleInputChange}
                                placeholder="Name"
                            />
                            <textarea
                                className='ocus:outline-none border p-2'
                                name="description"
                                value={place.description}  
                                onChange={handleInputChange}
                                placeholder="Description"
                            ></textarea>
                            <div style={{ width: '100%', height: '300px' }}>
                                <ReactMapGL
                                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                                    initialViewState={{
                                        longitude: lng,
                                        latitude: lat,
                                        zoom: 8,
                                    }}
                                    mapStyle={'mapbox://styles/mapbox/streets-v11'}
                                >
                                    <Marker
                                        latitude={lat}
                                        longitude={lng}
                                        draggable
                                        onDragEnd={(e) => { dispatch(setLocation({ lat: e.lngLat.lat, lng: e.lngLat.lng })) }} />
                                    <GeolocateControl
                                        position='top-left'
                                        trackUserLocation
                                        onGeolocate={(e) => { dispatch(setLocation({ lat: e.lngLat.lat, lng: e.lngLat.lng })) }}
                                    />
                                    <NavigationControl position='bottom-right' />
                                    <Geocoder />
                                </ReactMapGL>
                            </div>
                            <div className='flex justify-center gap-3 '>
                                <button className='bg-gray-200 text-black rounded p-2 ' type="submit">Add Place</button>
                                <button onClick={() => setshowForm(false)} className='bg-black text-white rounded p-2 ' type="button">Close</button>
                            </div>
                        </form>
                        <Toaster/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddPlaceForm