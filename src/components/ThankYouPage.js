import { useContext, useEffect } from 'react/cjs/react.development';
import { CartContext } from '../contexts/CartContext';
import { OrderContext } from '../contexts/OrderContext';

const ThankYouPage = () => {
  const { order } = useContext(OrderContext);
  const { resetCart } = useContext(CartContext);

  useEffect(() => resetCart(), []);

  return (
    <div className="thank-you-page">
      <h1>Thank you for your order</h1>
      <h2>Order number: {order.id}</h2>
      <div className="thank-you-page__order-details">
        <h3>Order details</h3>
        {order.cart.map((product) => (
          <div className="thank-you-page__product-details" key={product.id}>
            <h4>Pizza: {product.title}</h4>
            <p>Quantity: {product.quantity}</p>
            <p>Cost: {product.cost}</p>
          </div>
        ))}
      </div>
      <div className="thank-you-page__delivery-details">
        <h3>Delivery details</h3>
        <p>Name: {order.deliveryDetails.name}</p>
        <p>Street: {order.deliveryDetails.street}</p>
        <p>Building number: {order.deliveryDetails.buildingNumber}</p>
        {order.deliveryDetails.apartmentNumber && (
          <p>Apartment number: {order.deliveryDetails.apartmentNumber}</p>
        )}
        <p>Order date: {order.deliveryDetails.orderDate}</p>
      </div>
      <p className="thank-you-page__total-cost">
        <b>Total cost: $ {order.totalCost}</b>
      </p>
    </div>
  );
};

export default ThankYouPage;
