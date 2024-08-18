"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useStore } from '@/store/store';
import { Cart, CartItemType, Product } from '@/types/types';
import axios from 'axios';
import MeteorStardustLoader from '@/components/loading/loading';

type CartItem = {
  productId: number,
  name?: string,
  price?: number,
  quantity: number,
  image?: string,
}

const CartPage = () => {
  // Sample cart data

  const cart: Cart = useStore((state) => state.cart);
  const [error, setError] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[] | undefined>(); 
  const [localTrigger, setLocalTrigger] = useState(false); 
  const globalTrigger = useStore((state) => state.globalTrigger);
  const setGlobalTrigger = useStore((state) => state.setGlobalTrigger);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const newCart = cart?.products.map((item) => {
        const response = axios.get(`https://fakestoreapi.com/products/${item.productId}`); 
        return response.then((res) => {
          const data: Product = res.data;
          
          const newItem: CartItem = {
            productId: item.productId,
            name: data?.title,
            price: data?.price,
            quantity: item.quantity,
            image: data?.image
          }
          setLoading(false); 
          return newItem;
        }); 
      }); 
    if(newCart) {
      const cartPromise = Promise.all(newCart); 
    cartPromise.then((res) => setCartItems(res)); 
    }
  },[cart])


  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (id: number , newQuantity: number) => {
    if(newQuantity > 0) {
      setCartItems(cartItems?.map(item =>
      item.productId === id ? { ...item, quantity: newQuantity } : item
    ));
    }

  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems?.filter(item => item.productId !== id));
  };

  const handleApplyDiscount = (discountAmount:number, isValid:any ) => {
    console.log(isValid);
    setError(!isValid); 
    if(isValid) {
      setDiscount(discountAmount);
      setError(false);
    }
  };

  const subtotal = cartItems?.reduce((total, item) => total + (item.price || 0) * item.quantity, 0) || 0;
  const totalPrice = subtotal - discount;

  return (
    <>
      {
        loading? <MeteorStardustLoader/>: (
          <div className="bg-gray-900 text-white p-8">
      
            <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
            <div className="space-y-8">
              {cartItems?.map((item: CartItem) => (
                <div key={item.productId} className="flex items-center space-x-6">
                  <img src={item.image || "link"} alt={item.name || "image"} width={80} height={80} className="rounded-md" />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-lg">${item.price}</p>
                    <div className="flex items-center mt-4 space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        className="bg-gray-700 text-white px-2 py-1 rounded"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                        className="w-12 text-center bg-gray-800 text-white border border-gray-600 rounded-md"
                      />
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        className="bg-gray-700 text-white px-2 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700">
              <p className="text-lg">Subtotal: ${Math.round(subtotal)}</p>
              {discount > 0 && <p className="text-lg">Discount: -${Math.round(discount)}</p>}
              <p className="text-xl font-semibold mt-4">Total Price: ${Math.round(totalPrice)}</p>
              <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md">Proceed to Checkout</button>
            </div>
            <div className="mt-8 flex space-x-4">
              <button
                onClick={() => handleApplyDiscount(10, cart?.discount === "flat")}
                className="bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                Apply $10 Discount
              </button>
              <button
                onClick={() => handleApplyDiscount(subtotal * 0.1, true)}
                className="bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                Apply 10% Discount
              </button>
              {error ?        
              <div className=' text-red-500'>
                Discount not available
              </div> : ""}

            </div>
          </div>
        )
      }
    </>
  );
};

export default CartPage;
