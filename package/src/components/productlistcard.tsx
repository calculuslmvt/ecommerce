"use client"
import React, { useEffect, useState } from 'react'
import { Product } from '@/types/types';
import ProductCard from './product/thumnail';
import { useStore } from '@/store/store';

interface Props {
    list: Product[] | undefined,
}

const Productlistcard: React.FC<Props> = ({list: list}) => {
    const [pageTitle, setPageTitle] = useState(""); 
    const title = useStore((state) => state.productListCardTitle);
    useEffect(() => {
        setPageTitle(title);
    }, [title]) 
  return (
    <div>
        <div className="flex-col mx-auto bg-gray-900 text-white shadow-lg rounded-lg overflow-hidden h-full p-4">    
            <div className="p-6">
                <h2 className=" flex justify-center text-xl font-semibold mb-2 text-gray-300">{pageTitle}</h2>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 h-full'>
                {
                    list?.map((product: Product, index: number) => {
                        return (
                            <div key={index}>
                                <ProductCard product={product}/>
                            </div>  
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Productlistcard;
