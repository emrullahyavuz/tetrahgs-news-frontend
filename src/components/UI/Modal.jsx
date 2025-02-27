import { createPortal } from "react-dom";
import "./Modal.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Button from "./Button";

const Modal = ({
  title = "Bu bir title örneğidir.",
  desc = "Bu bir modal içerik örneğidir.",
  setShowModal,
  onConfirm,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("doma ilk yüklendiğinde çalıştı!");

    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    // clean-up function
    return () => {
      console.log("component kaldırıldığında çalıştı!");
      clearInterval(interval);
    };
  }, []);

  return createPortal(
    <div className="modal">
      <div className="modal-overlay" onClick={() => setShowModal(false)}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            <svg
              className="w-6 h-6 text-[#F7A91E] inline-block mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.995-1.85l.007-.15V6c0-1.054-.816-1.918-1.85-1.995L18.938 4H5.062c-1.054 0-1.918.816-1.995 1.85L3.062 6v12c0 1.054.816 1.918 1.85 1.995l.15.005z"
              ></path>
            </svg>
            <span className="text-[#231F20]">{title}</span>
          </h5>
          <span className="close-button" onClick={() => setShowModal(false)}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <p className="text-[#231F20]">{desc}</p>
        </div>
        <div className="modal-footer gap-x-6">
          <Button
            color="#F7A91E"
            textColor="#231F20"
            onClick={() => setShowModal(false)}
          >
            Kapat
          </Button>
          <Button
            color="#F7A91E"
            textColor="#231F20"
            onClick={() => {
              onConfirm();
              setShowModal(false);
            }}
          >
            Çıkış Yap
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;

Modal.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  setShowModal: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
