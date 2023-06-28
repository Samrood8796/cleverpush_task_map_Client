import { RxCross1 } from "react-icons/rx";

 const Modal = ({ isOpen, onClose, children }) => {
    return (
      <>
        {isOpen && (
          <>
          <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative bg-white p-10">
              <button
                className="absolute top-0 right-0 m-3 text-black hover:text-gray-700"
                onClick={onClose}
              >
                <RxCross1 className='text-2xl'></RxCross1>
              </button>
              {children}
            </div>
          </div>
              </>
        )}
      </>
    );
  };
  export default Modal;