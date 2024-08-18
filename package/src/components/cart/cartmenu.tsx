import { CartItemType, CartItemAction, Cart } from '@/types/types';
import React, { useEffect, useRef, useState } from 'react';
import CartItem from './cartitem';
import axios from 'axios';
import { useStore } from '@/store/store';
import Link from 'next/link';

type Item = {
  productId: number,
  quantity: number,
  price?: number
}

const ShoppingCartComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<Cart>();
  const [animate, setAnimate] = useState(false); 
  const cartIconRef = useRef<SVGSVGElement>(null);
  const discount = "percentage"; 

  const globalCart = useStore((state) => state.cart);
  useEffect(() => {
    if(globalCart)
      setCart(globalCart); 
  }, [globalCart]);

  const setGlobalCart = useStore((state) => state.setCart); 
  useEffect(() => {
    if(cart)
      setGlobalCart(cart);
    cartIconRef?.current?.classList.add('animate-[bounce_1s]');
    setTimeout(()=> {
      cartIconRef?.current?.classList.remove('animate-[bounce_1s]');
    }, 1000 )
  }, [cart]);

  const toggleCart = () => setIsOpen(!isOpen);
  const totalItems = cart?.products?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const totalPrice = cart?.products?.reduce((sum, item) => {
    if(item.price) {
      return sum + item.price*item.quantity;
    }
    return sum; 
  }, 0) || 0; 

  const handleIncrease = (productId: number) => {
    if(!cart) return; 
    const newCartItems: Item[] = cart.products.map((item: Item) => {
      if (item.productId === productId) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
      }
      return item; 
    })
    setCart({
      ...cart,
      products: newCartItems,
      discount: discount
    }); 
  };

  const handleDecrease = (productId: number) => {
    if(!cart) return;
    const newCartItems: Item[] = cart
      .products
      .map((item: Item) => {
        if(item.productId === productId) {
          return {
            ...item,
            quantity: item.quantity - 1
          }
        }
        return item; 
      })
      .filter(item => item?.quantity > 0);

      setCart({
        ...cart,
        products: newCartItems,
        discount: discount
      })
  };


  

  return (
    <div className="relative font-sans">
      <button
        onClick={toggleCart}
        className="flex items-center p-2 text-gray-200 hover:text-blue-400 transition-colors duration-200"
        aria-label="Shopping cart"
      >
        <svg 
          ref={cartIconRef}
          className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        {/* Shopping Bag Emoji */}
        {totalItems > 0 && (
          <span className="ml-1 text-xs bg-blue-500 text-white rounded-full px-2 py-1 leading-none">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 w-[20rem] mt-2 md:w-80 bg-gray-800 backdrop-blur-lg shadow-xl rounded-lg overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-200">Bag</h2>
              <button onClick={toggleCart} className="text-gray-400 hover:text-gray-200">
                ✕ {/* Close button (X) */}
              </button>
            </div>
            <div className="space-y-1">
              {cart?.products?.map((item) => (
                <CartItem 
                  key={item.productId} 
                  {...item} 
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                />
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex justify-between items-center font-medium text-gray-200">
                <span>Total</span>
                <span>
                  ${Math.round(totalPrice)}
                </span>
              </div>
            </div>
            <Link href="checkout">
              <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200">
                Check Out
              </button>
            </Link>

          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartComponent;