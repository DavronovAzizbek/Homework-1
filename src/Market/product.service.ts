import { Injectable } from '@nestjs/common';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Injectable()
export class ProductService {
  private products: Product[] = [];

  addProduct(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      id: Math.floor(Math.random() * 1000),
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  updateProduct(
    id: number,
    updatedProduct: Partial<Product>,
  ): Product | undefined {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedProduct,
      };
      return this.products[productIndex];
    }
    return undefined;
  }

  deleteProduct(id: number): Product | undefined {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex !== -1) {
      const deletedProduct = this.products.splice(productIndex, 1);
      return deletedProduct[0];
    }
    return undefined;
  }
}   
