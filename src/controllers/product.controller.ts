import { Request, Response } from 'express';
import { ProductService } from '../services/product.service.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { sendSuccess, sendCreated, sendNoContent } from '../utils/responses.js';
import { MESSAGES } from '../config/constants.js';

export class ProductController {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  getAllProducts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const products = await this.service.getAllProducts();
    sendSuccess(res, products, MESSAGES.SUCCESS.FETCHED);
  });

  getProductById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const product = await this.service.getProductById(id);
    sendSuccess(res, product, MESSAGES.SUCCESS.FETCHED);
  });

  createProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const product = await this.service.createProduct(req.body);
    sendCreated(res, product, MESSAGES.SUCCESS.CREATED);
  });

  updateProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const product = await this.service.updateProduct(id, req.body);
    sendSuccess(res, product, MESSAGES.SUCCESS.UPDATED);
  });

  deleteProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await this.service.deleteProduct(id);
    sendNoContent(res);
  });
}
