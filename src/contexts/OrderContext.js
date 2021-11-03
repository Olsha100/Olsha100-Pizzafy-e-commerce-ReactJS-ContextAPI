import { useState } from 'react';
import { createContext } from 'react/cjs/react.development';

export const OrderContext = createContext();

const OrderContextProvider = (props) => {
  const [order, setOrder] = useState([]);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
