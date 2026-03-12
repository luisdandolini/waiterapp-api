import type { Request, Response } from "express";
import { Category } from "../../models/Category.js";

export async function createCategory(req: Request, res: Response) {
  try {
    const { name, icon } = req.body;

    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
      return res.status(400).send({ message: "Category already exists!" });
    }

    const newCategory = await Category.create({ name, icon });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json(error);
  }
}
