import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import useFetch from '../custom hooks/useFetch';

const ProductList = () => {
  const { data, error, isPending } = useFetch('http://localhost:8000/products');

  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-list">
      {data &&
        data.map((product) => (
          <div className="product-list__product-card" key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{`$${product.price}`}</p>
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/${product.photoName}`}
              alt={product.title}
            />
            <Link to={`/${product.id}`}>
              <button className="product-list__button product-list__button--details">
                Details
              </button>
            </Link>
            <button
              className="product-list__button product-list__button--add"
              onClick={() => {
                addToCart(product.id);
              }}
            >
              Add to cart
            </button>
          </div>
        ))}
      {isPending && (
        <div className="product-list__loader">Loading products...</div>
      )}
      {error && (
        <div className="product-list__error-handler">
          {error}{' '}
          <b>
            App requires JSON server to run. You can find it{' '}
            <a href="https://www.npmjs.com/package/json-server">
              here
              <a />
            </a>
          </b>
        </div>
      )}
    </div>
  );
};

export default ProductList;
