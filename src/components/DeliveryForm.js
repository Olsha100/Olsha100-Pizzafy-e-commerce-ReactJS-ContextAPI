import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { CartContext } from '../contexts/CartContext';
import { OrderContext } from '../contexts/OrderContext';

const DeliveryForm = () => {
  const history = useHistory();
  const { cart, totalCost } = useContext(CartContext);
  const { setOrder } = useContext(OrderContext);

  // Input values' states

  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [orderDate, setOrderDate] = useState('');

  let orderDetails = {
    cart: cart.filter((product) => product.quantity > 0),
    totalCost: totalCost,
    deliveryDetails: {
      name: name,
      street: street,
      buildingNumber: buildingNumber,
      apartmentNumber: apartmentNumber,
      orderDate: orderDate,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });
      if (!response.ok) {
        const message = `We cannot finalize your order. An error has occured: Status ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      setOrder(data);

      history.push('/thank-you-page');
    } catch (error) {
      const errorHandler = document.querySelector(
        '.form-container__error-handler'
      );
      errorHandler.innerHTML = error;
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Delivery adress</h2>
        <ul>
          <li>
            <label htmlFor="name"></label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </li>
          <li>
            <label htmlFor="street"></label>
            <input
              type="text"
              id="street"
              name="street"
              placeholder="street"
              onChange={(e) => {
                setStreet(e.target.value);
              }}
              required
            />
          </li>
          <li>
            <label htmlFor="building number"></label>
            <input
              type="text"
              id="building number"
              name="building number"
              placeholder="building number"
              pattern="^\d+(\/\d+)*$"
              title="Provide a number or number with a slash e.g. 12, 12/23"
              onChange={(e) => {
                setBuildingNumber(e.target.value);
              }}
              required
            />
          </li>
          <li>
            <label htmlFor="apartment number"></label>
            <input
              type="text"
              id="apartment number"
              name="apartment number"
              pattern="^\d+$"
              title="Provide a number"
              placeholder="apartment number (optional)"
              onChange={(e) => {
                setApartmentNumber(e.target.value);
              }}
            />
          </li>
        </ul>
        <input
          type="submit"
          value="Place an order"
          onClick={() =>
            setOrderDate(
              new Date()
                .toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' })
                .slice(0, 20)
                .replace(/T/g, ' ')
            )
          }
        />
      </form>
      <p className="form-container__payment-info">
        Only cash payment available
      </p>
      <p className="form-container__error-handler"></p>
    </div>
  );
};

export default DeliveryForm;
