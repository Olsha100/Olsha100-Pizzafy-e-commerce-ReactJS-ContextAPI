import useFetch from '../custom hooks/useFetch';
import { useParams } from 'react-router';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const ProductDetails = () => {
  const { id } = useParams();

  const {
    data: product,
    error,
    isPending,
  } = useFetch('http://localhost:8000/products/' + id);

  const { addToCart, removeFromCart } = useContext(CartContext);

  return (
    <div className="product-details">
      {product && (
        <>
          <img
            src={`${process.env.PUBLIC_URL}/assets/img/${product.photoName}`}
            alt={product.title}
          />
          <article>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <h3>Ingredients</h3>
            <ul>
              {product &&
                product.ingredients.map((ingredient) => {
                  return <li key={ingredient}>{ingredient}</li>;
                })}
            </ul>
            <button
              className="product-details__button product-details__button--add"
              onClick={() => {
                addToCart(product.id);
              }}
            >
              +
            </button>
            <button
              className="product-details__button product-details__button--remove"
              onClick={() => {
                removeFromCart(product.id);
              }}
            >
              -
            </button>
          </article>
        </>
      )}

      {isPending && <div>Loading product details...</div>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default ProductDetails;
