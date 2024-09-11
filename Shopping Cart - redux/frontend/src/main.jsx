import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './redux/store';
import CartToshowadded from './cartToshowadded';
import Cart from './App';
 

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/cart" element={<CartToshowadded/>} />
       </Routes>
    </Router>
  </Provider>
);
