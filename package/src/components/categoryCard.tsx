"use client"
import { useStore } from '@/store/store';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function CategoryCard() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const response = axios.get("https://fakestoreapi.com/products/categories")
    response.then((res) => {
      setCategories(res.data);
    }) 
  }, []);

  const setProductListCardTitle = useStore((state) => state.setProductListCardTitle);
  const handleClick = (event: any) => {
      const categoryValue = event.target.textContent;
      setProductListCardTitle(categoryValue); 
  }
  return (
    <div>
        <div className=" w-full bg-gray-900 text-white shadow-lg rounded-lg overflow-hidden h-[30rem]">    
            <div className="p-6">

                <h2 className="flex text-xl justify-center font-semibold mb-2 text-gray-300">Categories</h2>
                <ul className="space-y-4 flex-row ">
                  {categories?.map((category, index) => (
                    <li key={index} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                      <button 
                        onClick={(event) => handleClick(event)}
                        className="flex text-sm text-gray-200 hover:text-white space-y-1">
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default CategoryCard;
