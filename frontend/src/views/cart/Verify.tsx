import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../actions/orderAction';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface CartState {
  cartItems: any[]; // Define the type of cartItems
  shippingAddress: string; // Adjust the type as necessary
  paymentMethod: string; // Adjust the type as necessary
  totalprice: number; // Adjust the type as necessary
}

interface RootState{
    cartreducer:CartState
}

const Verify: React.FC = () => {
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const cart = useSelector((state:RootState) => state.cartreducer) as CartState;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.totalprice,
        shippingPrice: 50,
        taxPrice: 1000,
        totalPrice: 1000,
      })
    );
    navigate("/wishlist");
  }, [dispatch, cart, navigate]);

  return (
    <div>Verify</div>
  );
};

export default Verify;
