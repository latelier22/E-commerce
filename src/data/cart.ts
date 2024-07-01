// api.ts

import { myFetch } from '../lib/myFetch';

const baseURL = process.env.NEXT_PUBLIC_URL_API;

export const addToCart = async (payload: {}): Promise<any> => {
    console.log("payload",payload)
  try {
    const response = await myFetch(`${baseURL}/api/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return response;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const deleteFromCart = async (id: number): Promise<any> => {
  try {
    const response = await myFetch(`${baseURL}/api/carts/${id}`, {
      method: 'DELETE',
    });
    return response;
  } catch (error) {
    console.error('Error deleting from cart:', error);
    throw error;
  }
};

export const getCartItems = async (email: string): Promise<any> => {
  try {
    const response = await myFetch(`${baseURL}/api/carts?populate[products][populate]=banner&filters[email][$eq]=${email}`);
    return response;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const getCartItemsTwo = async (email: string): Promise<any> => {
  try {
    const response = await myFetch(`${baseURL}/api/carts?populate[products][populate]=banner&filters[email][$eq]=${email}`);
    return response;
  } catch (error) {
    console.error('Error fetching cart items (with token):', error);
    throw error;
  }
};
