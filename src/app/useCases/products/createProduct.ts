import type { Request, Response } from "express";
import { Product } from "../../models/Product.js";

export async function createProduct(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;
    const { name, description, price, category, ingredients } = req.body;

    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ error: "name, price and category is required" });
    }

    const parsedPrice = Number(price);

    if (isNaN(parsedPrice)) {
      return res.status(400).json({ error: "price must be a valid number" });
    }

    const product = await Product.create({
      name,
      description,
      price: parsedPrice,
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
      ...(imagePath && { imagePath }),
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
}
