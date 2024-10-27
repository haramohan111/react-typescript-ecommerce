import axios from 'axios';
import React, { useState, useContext, createContext, useEffect, ReactNode } from 'react';
import api from '../utils/api';

// Define the type for the cart items
interface CartItem {
  _id: any;

  id: string;
  name: string;
  quantity: number;

}

// Define the type for the context value
type CartContextType = [CartItem[], React.Dispatch<React.SetStateAction<CartItem[]>>];

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartc, setCartc] = useState<CartItem[]>([]);

  useEffect(() => {
    api.get("api/v1/cart",{withCredentials:true})
      .then((response) => {

        setCartc([...cartc, response.data.allCart?.length]);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(cartc)
  return (
    <CartContext.Provider value={[cartc, setCartc]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { useCart, CartProvider };
