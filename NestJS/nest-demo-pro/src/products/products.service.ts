import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {

    products: <Record<string, any>>[] = [];

// your DB logic here, "Injectable" decorator, you can inject it as dependency
    findAll() {
        return this.products;
    }
}
