import { Product, IProduct } from '../models/product.model.js';

export class ProductRepository {
  async findAll(): Promise<IProduct[]> {
    return await Product.find().sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<IProduct | null> {
    return await Product.findById(id);
  }

  async create(data: Partial<IProduct>): Promise<IProduct> {
    const product = new Product(data);
    return await product.save();
  }

  async update(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
    return await Product.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
  }

  async delete(id: string): Promise<IProduct | null> {
    return await Product.findByIdAndDelete(id);
  }

  async existsByName(name: string): Promise<boolean> {
    const product = await Product.findOne({ name });
    return product !== null;
  }
}
