import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, clearCart } from './redux/cartSlice.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

const Cart = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  const cartItems = useSelector((state) => state.cart.cartItems);

  // Handle adding item to the cart with SweetAlert confirmation
  const handleAddItem = (item) => {
    Swal.fire({
      title: 'Item added!',
      text: `You have added ${item.title} to your cart.`,
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      dispatch(addItem(item));
    });
  };

  // Handle removing item from the cart with SweetAlert confirmation
  const handleRemoveItem = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to remove ${item.title} from your cart?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeItem(item));
        Swal.fire(
          'Removed!',
          `${item.title} has been removed from your cart.`,
          'success'
        );
      }
    });
  };

  // Handle clearing the cart with SweetAlert confirmation
  const handleClearCart = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will clear your entire cart!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, clear it!'
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

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Products</h2>
      <Link to="/cart" className="text-blue-500 hover:underline">Go to Cart</Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentItems.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <img src={product.image} alt={product.title} className="h-40 w-full object-contain mb-4" />
            <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
            <p className="text-gray-700 mb-4">${product.price}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
              onClick={() => handleAddItem(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1}>
                <button
                  className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Cart;
