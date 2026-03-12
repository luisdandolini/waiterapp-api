import type { Request, Response } from "express";
import { Category } from "../../models/Category.js";

export async function deleteCategory(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category is not exist" });
    }

    await Category.findByIdAndDelete(id);

    res.status(200).json({ message: "Category deleted sucess!" });
  } catch (error) {
    res.status(500).json(error);
  }
}
