import { Controller, Get, Header, HttpCode, Logger, Param, Post, Query, Redirect, Request, Response } from '@nestjs/common';
import type { AllProductsResponse } from './types/types';

@Controller('products')
export class ProductsController {
    @Get('/')
    @HttpCode(301)
    @Header('Authorization', `Bearer ${process.env.API_KEY}`)
    findAll(
        @Query() query
    ): AllProductsResponse {
        // Logger.log(request.ip);
        if (query.limit) Logger.log(query.limit);
        return {
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
        }
    }

    @Get('/docs')
    @Redirect('https://docs.nestjs.com', 302)
    getDocs(
        @Query('version') version
    ) {
        if (version && version === 5)
            return {
        url: 'https://docs.nestjs.com/v5'
            }
    }

    @Get(':id')
    findOne(
        @Param('id') id: string
    ) {
        return {
            id
        }
    }
}
