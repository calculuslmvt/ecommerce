"use client"
import React, { useEffect, useState } from 'react';
import CategoryCard from '@/components/categoryCard';
import Productlistcard from '@/components/productlistcard';
import { Product } from '@/types/types';
import axios from 'axios';
import { useStore } from '@/store/store';
import ShoppingCartComponent from '@/components/cart/cartmenu';
import MeteorStardustLoader from '@/components/loading/loading';

function Store() {

  const [productList, setProductList] = useState<Product[]>([]); 
  const [originalList, setOriginalList] = useState<Product[]>([]);  
  const [loading, setLoading] = useState(true); 
  
  useEffect(() => {
    const response = axios.get('https://fakestoreapi.com/products');
    response.then((res) => {
      setProductList(res.data);
      setOriginalList(res.data); 
      setLoading(false);
    })
  },[])

  const productListCardTitle = useStore((state) => state.productListCardTitle); 
  useEffect(() => {
    setProductList(originalList?.filter((product: Product) => product?.category === productListCardTitle))
  }, [productListCardTitle])

  const searchValue = useStore((state) => state.searchValue);
  useEffect(() => {
    if(searchValue !== "") {
      setProductList(originalList?.filter((product: Product) => product?.title.toLowerCase().includes(searchValue.toLowerCase())));
    }
  }, [searchValue])

  return (
    <>
    {
      loading ? <MeteorStardustLoader/> : (
        <div className='flex flex-col w-full h-screen gap-2 md:flex-row'>
          <div className='w-full md:w-[20rem] h-full md:p-4 my-20'>
            <CategoryCard/> 
          </div>  
          <div className='w-full md:w-5/6 md:p-4 md:m-20'>
            <Productlistcard list = {productList}/>
          </div>
        </div>
      )
    }

    </>
  )
}

export default Store; 
