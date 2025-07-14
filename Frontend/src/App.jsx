import { useEffect, useState } from 'react'
import Home from "./pages/Home.jsx"
import { Routes,Route } from 'react-router-dom';
import ProductDettails from "./pages/ProductDettails.jsx"
import {  Provider } from "react-redux"
import { store } from './app/store.js';
import Cart from './pages/Cart.jsx';
import Checkout  from "./pages/Checkout.jsx"
import Login from './pages/Login.jsx';
import Register from "./pages/Register.jsx"
import OrderSuccess from './pages/OrderSuccess.jsx';

import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider store={ store }>
      <div className='font-[gilroy] w-full h-screen bg-zinc-200'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/trendnext' element={<Home />} />
          <Route path='/trendnext/:id' element={ <ProductDettails />} />
          <Route path='/trendnext/cart' element={ <Cart /> } />
          <Route path='/trendnext/checkout' element={ <Checkout />} />
          <Route path='/trendnext/login' element={<Login />} />
          <Route path='/trendnext/register' element={<Register />} />
          <Route path='/trendnext/OrderSuccess' element={< OrderSuccess/>}/>
          <Route path='/trendnext/login' element={< Login/>}/>
          <Route path='/trendnext/register' element={< Register/>}/>
        </Routes>
      </div>
    </Provider>
  )
}

export default App
