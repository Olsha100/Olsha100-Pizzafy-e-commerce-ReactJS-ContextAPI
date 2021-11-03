import { createContext, useState } from 'react';

export const CartContext = createContext();

const CartContextProvider = (props) => {
  //Detailed cart state (cart per product)
  const [cart, setCart] = useState([
    {
      title: 'Pepperoni',
      quantity: 0,
      price: 5.99,
      cost: 0,
      id: 1,
    },
    {
      title: 'Capriciosa',
      quantity: 0,
      price: 4.99,
      cost: 0,
      id: 2,
    },
    {
      title: 'Cheesy',
      quantity: 0,
      price: 6.49,
      cost: 0,
      id: 3,
    },
    {
      title: 'Spicy',
      quantity: 0,
      price: 6.99,
      cost: 0,
      id: 4,
    },
  ]);

  //Cart state in total
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  //Adding a product to the cart
  const addToCart = (id) => {
    //udpating detailed state
    let currentQuantity = cart.filter((product) => product.id === id)[0]
      .quantity;
    let currentCost = cart.filter((product) => product.id === id)[0].cost;
    let price = cart.filter((product) => product.id === id)[0].price;
    setCart(
      cart.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: currentQuantity + 1,
              cost:
                Math.round((currentCost + price + Number.EPSILON) * 100) / 100,
            }
          : product
      )
    );

    //updating total state
    setTotalQuantity(totalQuantity + 1);
    setTotalCost(
      Math.round(
        (totalCost +
          cart.filter((product) => product.id === id)[0].price +
          Number.EPSILON) *
          100
      ) / 100
    );
  };

  //Removing a product from the cart
  const removeFromCart = (id) => {
    //Checking if a product is already in the cart
    if (cart[id - 1].quantity > 0) {
      //udpating detailed state
      let currentQuantity = cart.filter((product) => product.id === id)[0]
        .quantity;
      let currentCost = cart.filter((product) => product.id === id)[0].cost;
      let price = cart.filter((product) => product.id === id)[0].price;
      setCart(
        cart.map((product) =>
          product.id === id
            ? {
                ...product,
                quantity: currentQuantity - 1,
                cost:
                  Math.round((currentCost - price + Number.EPSILON) * 100) /
                  100,
              }
            : product
        )
      );

      //updating total state

      setTotalQuantity(totalQuantity - 1);
      setTotalCost(
        Math.round(
          (totalCost -
            cart.filter((product) => product.id === id)[0].price +
            Number.EPSILON) *
            100
        ) / 100
      );
    }
  };

  const resetCart = () => {
    setCart([
      {
        title: 'Pepperoni',
        quantity: 0,
        price: 5.99,
        cost: 0,
        id: 1,
      },
      {
        title: 'Capriciosa',
        quantity: 0,
        price: 4.99,
        cost: 0,
        id: 2,
      },
      {
        title: 'Cheesy',
        quantity: 0,
        price: 6.49,
        cost: 0,
        id: 3,
      },
      {
        title: 'Spicy',
        quantity: 0,
        price: 6.99,
        cost: 0,
        id: 4,
      },
    ]);

    setTotalQuantity(0);
    setTotalCost(0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalQuantity,
        totalCost,
        addToCart,
        removeFromCart,
        resetCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
