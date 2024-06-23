import { handler } from '../lambda/getProductById';
import { products } from '../lambda/productsMocks';

describe('getProductById', () => {
    it('should return status 200 with product', async () => {
        const event = {
            pathParameters: {
                productId: products[2].id,
            }
        }
        const result = await handler(event);

        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body)).toEqual(products[2]);
    });

    it('should return status 404 when product is not found with provided productId', async () => {
        const event = {
            pathParameters: {
                productId: '123',
            }
        }
        const result = await handler(event);

        expect(result.statusCode).toBe(404);
        expect(JSON.parse(result.body).message).toEqual(`Product with id ${event.pathParameters.productId} not found.`);
    });
});