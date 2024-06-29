// api.ts

import { myFetch } from '../lib/myFetch'; // Assurez-vous que le chemin est correct

const baseURL = process.env.NEXT_PUBLIC_URL_API;

export const categories = async (filter?: string) => {
  const response = await myFetch(`${baseURL}/api/categories/?populate=*&${filter}`);
  return response;
};

export const bestCategories = async () => {
  const response = await myFetch(`${baseURL}/api/best-categories?populate[categories][populate]=*`);
  return response;
};
