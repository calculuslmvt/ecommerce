import { create } from "zustand";
import { Cart } from "@/types/types";
import { Adamina } from "next/font/google";
type StoreType = {
    productListCardTitle: string,
    searchValue: string,
    totalPrice: number,
    cart?: Cart,
    globalTrigger: boolean,
    user: string
}

type StoreAction = {
    setProductListCardTitle: (newTitle: string) => void,
    setSearchValue: (newValue: string) => void,
    setTotalPrice: (newPrice: number) => void,
    setCart: (newCart: Cart) => void
    setGlobalTrigger: (trigger: boolean) => void,
    setUser: (newUser: string) => void,
}

export const useStore = create<StoreType & StoreAction>((set) => ({
    productListCardTitle: "Store",
    searchValue: "",
    totalPrice: 100,
    cart: undefined,  
    globalTrigger: false, 
    user: "login",
    setProductListCardTitle: (newTitle: string) => set({productListCardTitle: newTitle}),
    setSearchValue: (newValue) => set({searchValue: newValue}),
    setTotalPrice: (newPrice) => set({totalPrice: newPrice}),
    setCart: (newCart: Cart) => set({cart: newCart}),
    setGlobalTrigger: (trigger) => set({globalTrigger: trigger}),
    setUser: (newUser: string) => set({user: newUser})
}));

