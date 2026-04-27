export interface AllProductsResponse {
    success: boolean;
    data: {
        products: string[];
    };
    total: number;
    message: string;
};