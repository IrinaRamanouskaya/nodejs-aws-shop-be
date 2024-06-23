import { handler } from '../lambda/getProductsList';
import { products } from '../lambda/productsMocks';

describe('getProductsList', () => {
    it('should return status 200 with products list', async () => {
        const result = await handler();

        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body)).toEqual(products);
    });
});