import PropTypes from "prop-types";

import "./Button.css";

function Button({color,textColor,addClass,size,onDelete,onClick,children}) {
  // const { color, addClass, size, onDelete, onClick, children } = props;

  return (
    <button className={`btn btn-${color} bg-[${color}] text-[${textColor}] btn-${size} ${addClass} w-full hover:text-white`} onClick={onDelete ? onDelete : onClick}>
      {children}
    </button>
  );
}

export default Button;

Button.propTypes = {
  size: PropTypes.string,
  addClass: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.oneOf(["primary", "secondary", "success", "danger"]),
};
