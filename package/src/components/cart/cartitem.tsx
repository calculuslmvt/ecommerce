import { CartItemType, CartItemAction } from '@/types/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const CartItem: React.FC<CartItemAction & CartItemType> = ({ productId, quantity, onIncrease, onDecrease }) => {

    const [name, setName] = useState("object");
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const response = axios.get(`https://fakestoreapi.com/products/${productId}`);
        response.then((res) => {
            const data = res.data;
            setPrice(data.price);
            setName(data.title); 
        }) 
    },[])

    return (
           <div className="flex backdrop-blur-lg justify-between items-center py-3 border-b border-gray-700 last:border-b-0">
                <div className="flex flex-col p-2">
                    <span className="flex justify-start text-sm font-medium text-gray-200">{name}</span>
                    <span className="text-xs text-gray-400">${price.toFixed(2)}</span>
                </div>
                <div className="flex items-center">
                    <button
                    onClick={() => onDecrease(productId)}
                    className="text-gray-400 hover:text-gray-200 p-1"
                    aria-label="Decrease quantity"
                    >
                    <span className="text-xl">−</span> {/* Minus sign */}
                    </button>
                    <span className="mx-2 text-sm text-gray-200">{quantity}</span>
                    <button
                    onClick={() => onIncrease(productId)}
                    className="text-gray-400 hover:text-gray-200 p-1"
                    aria-label="Increase quantity"
                    >
                    <span className="text-xl">+</span> {/* Plus sign */}
                    </button>
                </div>
            </div> 
    )
}

export default CartItem;
