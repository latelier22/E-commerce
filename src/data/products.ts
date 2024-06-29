// api.ts

import { myFetch } from '../lib/myFetch'; // Assurez-vous que le chemin est correct

const baseURL = process.env.NEXT_PUBLIC_URL_API;

export const productDetails = async (id: string | number, filter?: string) => {
  const response = await myFetch(`${baseURL}/api/products/${id}?populate=*&${filter}`);
  return response;
};

export const products = async (filter?: string) => {
  const response = await myFetch(`${baseURL}/api/products?populate=*&${filter}`);
  return response;
};

export const productsByCategory = async (slug: string, filter?: string) => {
  if (slug === "all") {
    return await products();
  }
  const response = await myFetch(`${baseURL}/api/products?populate=*&filters[$and][0][category][slug][$eq]=${slug}&${filter}`);
  return response;
};

export const bestSellersProducts = async (data: "products" | "product") => {
  const response = await myFetch(`${baseURL}/api/best-sellers?populate[${data}][populate]=*`);
  return response;
};

export const searchProducts = async (title?: string) => {
  const response = await myFetch(`${baseURL}/api/products?populate=*&filters[title][$contains]=${title}`);
  return response;
};
