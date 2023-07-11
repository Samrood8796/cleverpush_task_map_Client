import { useDispatch } from "react-redux"
import { setLogout } from "../../state/userReducer"
import AddPlaceForm from "../AddPlaceForm/AddPlaceForm"
import { useNavigate } from "react-router-dom"

const Navbar = ({ showForm, setshowForm }) => {
    const navigate= useNavigate()
    const dispatch = useDispatch()
    return (
        <>
            <nav className='sticky box-border mb-4 bg-[#02abc5] flex justify-between h-[64px] items-center px-5 shadow-md'>
                <div className='flex item-center space-x-5'>
                    <i className='fa-solid fa-bars'></i>
                    <h1 className='text-3xl text-white italic from-neutral-700'>Map</h1>
                </div>
                <div className='flex text-white font-medium'>
                    <div className="flex items-center">
                        <button onClick={()=>{navigate('/')}} className='px-4'>
                            Home
                        </button>
                        <button onClick={()=>{navigate('/dashboard')}} className='px-4'>
                            Dashboard
                        </button>
                        <button onClick={() => setshowForm(true)} >
                            CreateNew
                        </button>
                    </div>
                    <p onClick={()=>{dispatch(setLogout()); navigate('/login')}} className=" px-3 py-3 rounded-md text-sm ">logout</p>
                </div>
            </nav>
            {
                showForm &&
                <div className="bg-gray-400 absolute left-1/3 right-1/3">
                    <AddPlaceForm setshowForm={setshowForm}/>
                </div>
            }

        </>
    )
}

export default Navbar