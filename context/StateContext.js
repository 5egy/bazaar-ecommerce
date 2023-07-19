import React, { useState, useContext, createContext, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export function StateContext({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);

  
  
  useEffect(()=>{

    if(window.localStorage.cartItems !== undefined && cartItems.length === 0){
      setCartItems([...JSON.parse(window.localStorage.cartItems)])
      setTotalPrice( Number(window.localStorage.totalPrice))
      setTotalQty( Number(window.localStorage.totalQty))
    }
  },[])

  function addToCart(product) {
    const prodExist = cartItems.find((item) => item.id === product.id);
    setTotalQty((tot) => tot + product.quantity);
    setTotalPrice((tot) => tot + product.price);
    window.localStorage.totalPrice =  totalPrice + product.price;
    window.localStorage.totalQty =  totalQty + product.quantity;

    if (prodExist) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + product.quantity,
          };
        }
        return item;
      });
      setCartItems(updatedCartItems);
      window.localStorage.cartItems = JSON.stringify(updatedCartItems)
    } else {
      setCartItems([...cartItems, { ...product }]);
      window.localStorage.cartItems = JSON.stringify([...cartItems, {...product}])
    }

    toast.success(`1 ${product.name} added to the cart.`);
  }

  function incr(prod){
      setTotalQty((tot) => tot + 1);
      setTotalPrice((tot) => tot + prod.price);
      window.localStorage.totalPrice =  totalPrice + prod.price;
      window.localStorage.totalQty =  totalQty + 1;
      
      const updatedCartItems = cartItems.map((item) => {
          if (item.id === prod.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setCartItems(updatedCartItems);
      window.localStorage.cartItems = JSON.stringify(updatedCartItems)
  }

  function decr(prod){
      const updatedCartItems = cartItems.map((item) => {
          
          if (item.id === prod.id && item.quantity > 1) {
            setTotalQty((tot) => tot - 1);
            setTotalPrice((tot) => tot - prod.price);
            window.localStorage.totalPrice =  totalPrice - prod.price;
            window.localStorage.totalQty =  totalQty - 1;

          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
      setCartItems(updatedCartItems);
      window.localStorage.cartItems = JSON.stringify(updatedCartItems)
  }

  function removeItem(prod){
    
    setTotalQty((tot) => tot - prod.quantity);
    setTotalPrice((tot) => tot - (prod.price * prod.quantity));

    window.localStorage.totalPrice =  totalPrice - (prod.price * prod.quantity);
    window.localStorage.totalQty =  totalQty - prod.quantity;

    const updatedCartItems = cartItems.filter((item) => item.id !== prod.id);
    setCartItems(updatedCartItems);
    window.localStorage.cartItems = JSON.stringify(updatedCartItems)
  }

  return (
    <Context.Provider
      value={{ cartItems, totalPrice, totalQty, addToCart, incr, decr, removeItem }}
    >
      {children}
    </Context.Provider>
  );
}

export const useStateContext = () => useContext(Context);
