import { ProductRepository } from '../repositories/product.repository.js';
import { IProduct } from '../models/product.model.js';
import { AppError } from '../utils/AppError.js';
import { HTTP_STATUS, MESSAGES } from '../config/constants.js';

export class ProductService {
  private repository: ProductRepository;

  constructor() {
    this.repository = new ProductRepository();
  }

  async getAllProducts(): Promise<IProduct[]> {
    return await this.repository.findAll();
  }

  async getProductById(id: string): Promise<IProduct> {
    const product = await this.repository.findById(id);
    
    if (!product) {
      throw new AppError(MESSAGES.ERROR.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    
    return product;
  }

  async createProduct(data: Partial<IProduct>): Promise<IProduct> {
    this.validateProductData(data);
    
    if (data.name && await this.repository.existsByName(data.name)) {
      throw new AppError(
        `Product with name "${data.name}" ${MESSAGES.ERROR.ALREADY_EXISTS}`,
        HTTP_STATUS.CONFLICT
      );
    }
    
    return await this.repository.create(data);
  }

  async updateProduct(id: string, data: Partial<IProduct>): Promise<IProduct> {
    this.validateProductData(data, true);
    
    const product = await this.repository.update(id, data);
    
    if (!product) {
      throw new AppError(MESSAGES.ERROR.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    
    return product;
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.repository.delete(id);
    
    if (!product) {
      throw new AppError(MESSAGES.ERROR.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
  }

  private validateProductData(data: Partial<IProduct>, isUpdate: boolean = false): void {
    if (!isUpdate) {
      if (!data.name || !data.description || data.price === undefined || data.stock === undefined) {
        throw new AppError(MESSAGES.ERROR.INVALID_INPUT, HTTP_STATUS.BAD_REQUEST);
      }
    }

    if (data.price !== undefined && data.price < 0) {
      throw new AppError(MESSAGES.VALIDATION.POSITIVE_NUMBER, HTTP_STATUS.BAD_REQUEST);
    }

    if (data.stock !== undefined && data.stock < 0) {
      throw new AppError(MESSAGES.VALIDATION.NON_NEGATIVE_NUMBER, HTTP_STATUS.BAD_REQUEST);
    }
  }
}
