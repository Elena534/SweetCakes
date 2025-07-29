import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { CartContext  } from '../context/CartContext';
import './CartIcon.css';

const CartIcon = () => {
  const { totalItems } = useContext(CartContext);

  return (
    <div className="cart-icon">
      <Link to="/cart" className="header-link">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="30"
             height="30"
             fill="#ff69b4"
             viewBox="0 0 576 512">
            <path d="M0 24C0 10.7 10.7 0 24 0H56C66.5 0 75.7 6.7 79.2 16.5L89.4 48H552C567.5 48 578.9 62.2 575 77.2L519 293.2C512.4 318.3 490.1 336 464.2 336H165.6L173.8 368H488C501.3 368 512 378.7 512 392C512 405.3 501.3 416 488 416H160C149.5 416 140.3 409.3 136.8 399.5L103.2 287.5L41.1 97.1C35.5 80.2 48.2 62.1 66 62.1H486.7L492.2 80H122.1L107.2 31.3C104.2 22.5 95.7 16 86.1 16H24C10.7 16 0 26.7 0 40V24zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM432 464C432 437.5 453.5 416 480 416C506.5 416 528 437.5 528 464C528 490.5 506.5 512 480 512C453.5 512 432 490.5 432 464z"/>
        </svg>
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
      </Link>
    </div>
  );
};

export default CartIcon;
