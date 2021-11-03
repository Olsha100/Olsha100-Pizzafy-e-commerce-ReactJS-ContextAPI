import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

function NavBar() {
  const { totalQuantity, totalCost } = useContext(CartContext);

  return (
    <div className="nav-bar">
      <Link to="/">
        <img
          src={`${process.env.PUBLIC_URL}/assets/img/logo.png`}
          alt="pizza logo"
          className="nav-bar__logo"
        />
      </Link>
      <Link to="/cart">
        <div className="nav-bar__shopping-cart">
          <div className="nav-bar__shopping-cart-img-box">
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/cart.svg`}
              alt="cart"
              className="cart"
            />
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/pizza-icon.png`}
              alt="pizza icon"
              className="pizza-icon"
            />

            <div className="nav-bar__products-count">{totalQuantity}</div>
          </div>

          <div className="nav-bar__products-cost">$ {totalCost}</div>
        </div>
      </Link>
    </div>
  );
}

export default NavBar;
