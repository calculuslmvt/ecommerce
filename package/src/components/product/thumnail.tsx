import React, { useRef, useState } from 'react';
import { Product } from '@/types/types';
import { useStore } from '@/store/store';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {

    const [isAdded, setIsAdded] = useState(false);
    const setGlobalCart = useStore((state) => state.setCart); 
    const globalCart = useStore((state) => state.cart);
    const addButtonRef = useRef<HTMLButtonElement>(null); 
    const handleClick = () => {
        setIsAdded(true); 
        addButtonRef?.current?.classList.remove("bg-blue-600", "hover:bg-blue-700");
        const promise = setTimeout(()=> {
            addButtonRef?.current?.classList.add("bg-blue-600", "hover:bg-blue-700");
        }, 100);
        
        
        console.log(product);
        if(!product)return;
        
        let itemAlreadyInCart = false;

        const newCart = globalCart?.products
        .map((item) => {
            if(item.productId === product.id){ 
                itemAlreadyInCart = true;
                return {
                    ...item,
                    quantity: item.quantity + 1,
                }
            }
            return item;
        });
        if(newCart)
        setGlobalCart({...globalCart, products: newCart}); 
        if(itemAlreadyInCart) return; 

        const item = {
            productId: product.id,
            quantity: 1,
            price: product.price
        }
        
        let cartProducts; 
        if(globalCart) {
            cartProducts = globalCart?.products;
            cartProducts?.push(item); 
        }
        else {
            cartProducts = [item];
        }
 
        setGlobalCart({...globalCart, products: cartProducts}); 

        console.log(globalCart); 
    }
    return (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden h-[35rem] relative hover:bg-gray-900 transition-colors">
            {product?.image && (
                <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-48 object-cover"
                />
            )}
            <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-2 h-[7rem] overflow-hidden">{product?.title}</h3>
                {product?.brand && (
                    <p className="text-sm text-gray-400 mb-2 h-10">{product.brand}</p>
                )}
                {product?.description && (
                    <p className="text-gray-300 text-sm mb-4 h-20 overflow-hidden">{product.description}</p>
                )}
                <div className="flex justify-between items-center h-10">
                    {product?.price !== undefined ? (
                        <span className="text-lg font-bold text-green-400">
                            ${product.price.toFixed(2)}
                        </span>
                    ) : (
                        <span className="text-sm text-gray-400">Price not available</span>
                    )}
                    {product?.category && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                            {product.category}
                        </span>
                    )}
                </div>
            </div>
            <div className="px-4 py-3">
                <button 
                ref={addButtonRef}
                onClick={handleClick}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
                    {isAdded? "Add again" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;