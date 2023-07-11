import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { useControl } from 'react-map-gl'
import { useDispatch } from 'react-redux'
import { setLocation } from '../../state/userReducer'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
const Geocoder = () => {
    const dispatch = useDispatch()
    const ctrl = new MapBoxGeocoder({
        accessToken:process.env.REACT_APP_MAPBOX_API_KEY, 
        marker:false,
        collapsed:true
    })
    useControl(()=>ctrl)
    ctrl.on('result', (e)=>{
        const coords = e.result.geometry.coordinates
        dispatch(setLocation({lng:coords[0], lat:coords[1]}))
    })
  return (
   null
  )
}

export default Geocoder