import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
  const { cart, totalCost, addToCart, removeFromCart } =
    useContext(CartContext);

  const history = useHistory();
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  const handleClick = () => {
    if (totalCost > 0) {
      setIsCartEmpty(false);
      history.push('/delivery-form');
    } else {
      setIsCartEmpty(true);
    }
  };

  return (
    <div className="cart">
      <h1>Cart details</h1>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Cost</th>
            <th>Add / Remove a product</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.quantity}</td>
                <td>{product.cost}</td>
                <td>
                  <button
                    className="cart__button cart__button--add"
                    onClick={() => {
                      addToCart(product.id);
                      setIsCartEmpty(false);
                    }}
                  >
                    +
                  </button>
                  <button
                    className="cart__button cart__button--remove"
                    onClick={() => removeFromCart(product.id)}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="cart__total-cost">{`Total cost: $ ${totalCost}`}</div>
      <button className="cart__button--fill-form" onClick={handleClick}>
        Fill delivery form
      </button>
      {isCartEmpty && <p>Your cart is empty</p>}
    </div>
  );
};

export default Cart;
