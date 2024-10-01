import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  addProduct(
    @Body() product: { name: string; description: string; price: number },
  ) {
    return this.productService.addProduct(product);
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    const product = this.productService.getProductById(Number(id));
    if (product) {
      return product;
    } else {
      return { message: 'Product not found' };
    }
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body()
    updatedProduct: { name?: string; description?: string; price?: number },
  ) {
    return this.productService.updateProduct(Number(id), updatedProduct);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    const deletedProduct = this.productService.deleteProduct(Number(id));
    if (deletedProduct) {
      return deletedProduct;
    } else {
      return { message: 'Product not found' };
    }
  }
}
