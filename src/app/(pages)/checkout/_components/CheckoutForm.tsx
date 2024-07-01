'use client'
import { getCartItems, getCartItemsTwo } from '@/data/cart';
import { useUser } from '@clerk/nextjs';
import {PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { StripeError } from '@stripe/stripe-js';
import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { CartItemsType } from '../../cart/page';
import { totalPrice } from '../../cart/_components/Cart';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<any>()
  const {user} = useUser();
  const [cartItems, setCartItems] = useState<CartItemsType | null>(null)
  async function getItems() {
    if (user) {
      const cartItems: CartItemsType = await getCartItemsTwo(user?.emailAddresses[0].emailAddress || 'm')
      setCartItems(cartItems)      
    }
  }
  
  useEffect(() => {
    getItems();
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement> ) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (cartItems && cartItems.data.length === 0) {
      setErrorMessage('Your cart is empty, please add product from products page to your cart')
      return;
    }
    const handleError = (error: StripeError) => {
      setLoading(false);
      setErrorMessage(error.message)
    }

    const {error: submitError} = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
    const res = await axios.post('/api/create-intent', {
      amount: cartItems && totalPrice(cartItems)
    })
    const clientSecret = await res.data
    const result = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        return_url: "https://github.com/m7md0a"
        // Ajoutez d'autres informations client si nécessaire
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {

    }
  };

  return (
  <form onSubmit={handleSubmit} className='p-4 md:p-8 rounded-box md:mx-auto md:w-2/4 flex flex-col items-center bg-base-100'>
      <PaymentElement className='w-full'/>
      <button disabled={!stripe} className='btn btn-primary mt-4 w-full md:w-3/4'>Submit</button>
      {errorMessage && <div className='alert alert-error mt-2 p-3 text-sm w-full md:w-3/4'>{errorMessage}</div>}
    </form>
  )
};

export default CheckoutForm;