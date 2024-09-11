import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, clearCart, incrementQuantity, decrementQuantity } from './redux/cartSlice.js';
import Swal from 'sweetalert2';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleRemoveItem = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to remove this item from your cart?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeItem(item));
        Swal.fire(
          'Removed!',
          'The item has been removed from your cart.',
          'success'
        );
      }
    });
  };

  const handleClearCart = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will clear your entire cart!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, clear it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());
        Swal.fire(
          'Cleared!',
          'Your cart has been cleared.',
          'success'
        );
      }
    });
  };

  const handleIncrementQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };

  const handleDecrementQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600">${item.price}</p>
                    <p className="text-gray-600">Quantity: {Number(item.quantity)}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-300"
                    onClick={() => handleIncrementQuantity(item)}
                  >
                    +
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition duration-300"
                    onClick={() => handleDecrementQuantity(item)}
                  >
                    -
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    onClick={() => handleRemoveItem(item)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button
            className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 mt-8 w-full"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
