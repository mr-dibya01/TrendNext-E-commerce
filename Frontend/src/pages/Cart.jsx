import Navbar from '../components/Navbar';
import { FaPlus ,FaMinus ,FaTag ,FaArrowRightLong } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { increaseItem ,decreaseItem ,removeToCart ,setBuyNowItem } from "../features/cart/cartSlice.js"
import { useDispatch ,useSelector } from 'react-redux';


  
function Cart() {
  const Navigate=useNavigate();
  const Dispatch=useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("Cart Items", cartItems);
  function handleIncreaseItem(item){
    Dispatch(increaseItem(item));
    console.log(item);
  }
  function handleDecreaseItem(item){
    Dispatch(decreaseItem(item));
    console.log(item);
  }
  function handleDeletion(item){
    console.log(item);
    Dispatch(removeToCart(item));
    console.log("removeToCart",item);
  }
  function handleCheckout(){
    localStorage.setItem("buyNowData",JSON.stringify(cartItems));
    Dispatch(setBuyNowItem(cartItems));
    Navigate("/trendnext/checkout");
  }
  const subTotal=cartItems.reduce((acc,item)=> acc + item.price * item.quantity,0);
  const Discount=subTotal * 0.25;
  const DeliveryFee=5;
  const Total =(subTotal + DeliveryFee) - Discount;
  return (
    <>
      <Navbar />
      <div className={`py-7 px-9 w-full bg-zinc-200`}>
        <div className='cart-items-container bg-white shadow-lg  px-28 w-full py-10'>
          <h1 className='text-6xl uppercase font-mono'>Your Cart Items</h1>
          {cartItems.length === 0 ? <div className='h-[530px] w-full flex flex-col justify-center items-center'>
            <h1 className='text-6xl uppercase font-semibold text-center translate-y-[-50px] text-red-600'>Cart page is Empty</h1>
            <button className='bg-black text-white px-20 py-3 text-lg rounded-full uppercase' onClick={ () => Navigate("/") }>Add items Your Cart 👈</button>
            </div> : <div className='cart-content w-full flex gap-16'>
            <div className="left w-[55%] bg-zinc-100   px-5 py-10  rounded-xl border h-fit border-gray-400">
              {cartItems.map((item) => {
                return<div className=" product-dettails h-[18vh]  product flex py-3 border-b-[1px] border-gray-400" key={item.id}>
                  <div className='h-full w-[15%] bg-white rounded-xl mr-2 flex items-center justify-center'>
                    <img className='h-25 w-full object-cover rounded-xl' src={item.image} alt="" />
                  </div>
                  <div className='flex flex-col justify-between    w-full'>
                    <h1 className='font-mono font-bold text-lg leading-none'>{item.title.length < 50 ? item.title.slice(0,50) : item.title}</h1>
                    <h1 className='text-sm'>Size: <span className='text-gray-500 text-xs'>{item.size}</span></h1>
                    <h1 className='text-xl font-sans font-semibold'>${item.price}</h1>
                    <div className='quantity+Delete flex justify-between items-center'>
                      <div className='h-7 w-24 border border-black  flex items-center justify-around rounded-full'>
                        <button onClick={()=>{handleDecreaseItem(item)}}> <FaMinus className='hover:text-zinc-700 transition'/> </button>
                        <h1>{item.quantity}</h1>
                        <button onClick={()=>{handleIncreaseItem(item)}}><FaPlus className='hover:text-zinc-700 transition'/></button>
                      </div>
                      <div className='h-10 w-10 flex justify-center items-center cursor-pointer transition-transform hover:scale-110' onClick={ () => { handleDeletion(item) }}>
                        <RiDeleteBin6Line className='size-5 text-red-600'/>
                      </div>
                    </div>
                  </div>
                </div>
              })}
            </div>
            <div className='right w-[30%]'>
              <div className="right px-5 py-2 border border-zinc-600 rounded-xl bg-zinc-100">
                <h1 className='text-2xl font-medium pb-2'>Order Summary</h1>
                <div className='Top'>
                  <div className='flex justify-between pb-2'>
                    <h2 className='text-lg text-zinc-500'>Subtotal</h2>
                    <h2 className='font-semibold font-mono text-lg'>${subTotal}</h2>
                  </div>
                  <div className='flex justify-between pb-2'>
                    <h2 className='text-lg text-zinc-500'>Discount(-25%)</h2>
                    <h2 className='font-semibold font-mono text-lg text-red-600'>-${Discount.toString().length > 7 ? Discount.toString().slice(0,6) : Discount}</h2>
                  </div>
                  <div className='flex justify-between pb-2'>
                    <h2 className='text-lg text-zinc-500'>Delivery fee</h2>
                    <h2 className='font-semibold font-mono text-lg'>${DeliveryFee}</h2>
                  </div>
                </div>
                <div className='border-t-[1px] border-zinc-400'>
                  <div className='flex justify-between py-2'>
                    <h1 className='text-lg'>Total</h1>
                    <h1 className='font-semibold font-mono text-xl'>${Math.floor(Total)}</h1>
                  </div>
                  <div className='flex overflow-hidden rounded-full my-2'>
                    <div className='h-10 w-10 flex justify-center items-center bg-white'>
                      <FaTag  className='w-4 h-4 text-zinc-500'/>
                    </div>
                    <input type="text" className='bg-white h-10 px-2 outline-none rounded-e-full w-[calc(100%-23%-40px)]' placeholder='Add promo code'/>
                    <button className='h-10 bg-black text-white rounded-full px-6 py-2'>Apply</button>
                  </div>
                  <div className='relative  my-4'>
                    <button className='bg-black w-full h-12 rounded-full text-white' onClick={handleCheckout}>Go to Checkout </button>
                    <FaArrowRightLong className='absolute text-white left-[75%] top-1/2  -translate-y-1/2 -translate-x-1/2'/>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        </div>
      </div>
    </>
  );
}

export default Cart;