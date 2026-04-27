import { Controller, Get, Logger, Query, Request, Response } from '@nestjs/common';
import type { AllProductsResponse } from './types/types';

@Controller('products')
export class ProductsController {
    @Get('/')
    findAll(
        @Request() request,
        @Response() response,
        @Query() query
    ): AllProductsResponse {
        // Logger.log(request.ip);
        Logger.log(query?.limit);
        return response.status(200).json({
            success: true,
            data: {
                products: [
                    'iPhone 14 Pro Max',
                    'iPhone 14 Pro',
                    'iPhone 14',
                    'iPhone 14 Plus'
                ]
            },
            total: 4,
            message: 'Products retrieved successfully'
        });
    }
}
