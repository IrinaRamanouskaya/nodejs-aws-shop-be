import { headers } from './headers';
import { products } from './productsMocks';

// @ts-ignore
export const handler = async (event) => {
    const id = event?.pathParameters?.productId;

   try {
       const product = products.find(product => product.id === id);

       return product ? {
           statusCode: 200,
           headers,
           body: JSON.stringify(product),
       } : {
           statusCode: 404,
           headers,
           body: JSON.stringify({
               message: `Product with id ${id} not found.`,
           }),
       }
   } catch (error) {
       return {
           statusCode: 500,
           headers,
           body: JSON.stringify({
               message: 'Server Error',
               data: error,
           }),
       }
   }
}