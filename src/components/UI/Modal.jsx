import { createPortal } from 'react-dom';
import './Modal.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';


const Modal = ({ 
  title = 'Bu bir title örneğidir.',
  desc = 'Bu bir modal içerik örneğidir.',
  setShowModal }) => {
  
    const [count, setCount] = useState(0)
  
    useEffect(() => {
      console.log("doma ilk yüklendiğinde çalıştı!")

     const interval =  setInterval(() => {

        setCount(count => count + 1)
        // console.log(count)
      }, 1000)

      

      // clean-up function
      return () => {
        console.log("component kaldırıldığında çalıştı!")
        clearInterval(interval)
        
      }
    }, []
    )

  return (

    
    createPortal(
      <div className="modal">
             <div className="modal-overlay" onClick={() => setShowModal()}></div>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title} - {count}</h5>
                <span className="close-button" onClick={() => setShowModal()}>
                  &times;
                </span>
              </div>
              <div className="modal-body">
                <p>{desc}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal()}
                >
                  Kapat
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowModal()}
                >
                  Kaydet
                </button>
              </div>
            </div>
          </div>, document.getElementById('modal-root')
          )
  );
};
export default Modal;

Modal.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  setShowModal: PropTypes.func.isRequired

}