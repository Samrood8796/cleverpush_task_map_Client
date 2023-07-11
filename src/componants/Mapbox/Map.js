import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { setLocation } from '../../state/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import Geocoder from './Geocoder';
const Map = () => {
    const { lng, lat } = useSelector((state) => state.location)
    const dispatch = useDispatch()
    const mapRef = useRef()
    useEffect(() => {
        if (!lng && !lat) {
            console.log('first')
            fetch('https://ipapi.co/json').then((response) => {
                console.log("data");
                console.log(response);
                return response.json()
            }).then((data) => { 
                mapRef.current.flyTo({
                    center: [data.longitude, data.latitude]
                })
                dispatch(setLocation({ lng: data.longitude, lat: data.latitude }))
            })
        }
    }, [])
    return (
        <div className='relative' style={{ height: '400px', width: '100%' }}>
            <ReactMapGL
                ref={mapRef}
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
                <Geocoder/>
            </ReactMapGL>
        </div >
    )
}

export default Map;

// import React, { useRef, useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
// const latitude = 28.6448;
// const longitude = 77.216;
// const Map = () => {
//     const mapContainerRef = useRef(null);

//     useEffect(() => {
//         // Create the map instance
//         const map = new mapboxgl.Map({
//             container: mapContainerRef.current,
//             style: 'mapbox://styles/mapbox/streets-v11', // Customize the map style here
//             center: [longitude, latitude], // Set the initial map center
//             zoom: 12, // Set the initial zoom level
//         });
//         // Clean up the map instance on unmount
//         return () => map.remove();
//     }, []);

//     return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
// };

// export default Map;  