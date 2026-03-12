import type { Request, Response } from "express";
import { Product } from "../../models/Product.js";

export async function listProductsByCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;

    const products = await Product.find().where("category").equals(categoryId);

    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
}
