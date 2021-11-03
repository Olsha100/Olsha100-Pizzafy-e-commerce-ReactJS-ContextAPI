import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cart from './components/Cart';
import DeliveryForm from './components/DeliveryForm';
import NavBar from './components/NavBar';
import ProductDetails from './components/ProductDetails';
import ProductList from './components/ProductList';
import ThankYouPage from './components/ThankYouPage';
import CartContextProvider from './contexts/CartContext';
import OrderContextProvider from './contexts/OrderContext';

function App() {
  return (
    <Router>
      <div className="App">
        <CartContextProvider>
          <OrderContextProvider>
            <NavBar />
            <Switch>
              <Route exact path="/">
                <ProductList />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/delivery-form">
                <DeliveryForm />
              </Route>
              <Route path="/thank-you-page">
                <ThankYouPage />
              </Route>
              <Route path="/:id">
                <ProductDetails />
              </Route>
            </Switch>
          </OrderContextProvider>
        </CartContextProvider>
      </div>
    </Router>
  );
}

export default App;
