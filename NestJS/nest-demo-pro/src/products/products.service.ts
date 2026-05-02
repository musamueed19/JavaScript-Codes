import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';

@Injectable()
export class ProductsService {

    private products: CreateProductDTO[] = [];

// your DB logic here, "Injectable" decorator, you can inject it as dependency
    findAll() {
        return this.products;
    }

    createProduct(product: CreateProductDTO) {
        const existingProduct = this.products.find(p => p.id === product.id)

        if (existingProduct) return {
            success: false,
            message: `Product with the id: ${existingProduct.id} already exists`,
            product: existingProduct
        }

        this.products.push(product)

        return {
            success: true,
            message: `Products data fetched successfully`,
            data: {
                product,
                products: this.products
            } 
        }
    }
}
