import React, { useState } from 'react';
import './styles.css';
import { BsPlusSquareDotted } from 'react-icons/bs'
import { RxCross1 } from 'react-icons/rx'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <header className='home-header'>
      <h2>This Morning</h2>
      <h1>
        <span>“</span> Blog <span>”</span>
      </h1>
      <p>
        awesome place to make oneself <br /> productive and entertained through
        daily updates.
      </p>
      <div className='flex justify-center items-center mt-2'>
        <div className='mr-2 text-blue-600'>Add Blog  </div>
        <button onClick={() => setIsOpen(true)}><BsPlusSquareDotted className='text-4xl text-center'></BsPlusSquareDotted></button>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <h1 className="text-2xl font-bold mb-4">Modal Content</h1>
          <p>This is the content of the modal.</p>
        </Modal>
      </div>
    </header>
  );
}
export default Header;

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
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
      )}
    </>
  );
};

// export  Modal;