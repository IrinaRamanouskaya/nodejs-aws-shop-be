import { headers } from './headers';
import { products } from './productsMocks';

export const handler = async () => {
    try {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(products),
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