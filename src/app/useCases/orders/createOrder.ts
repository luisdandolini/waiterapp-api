import type { Request, Response } from "express";
import { Order } from "../../models/Order.js";

export async function createOrder(req: Request, res: Response) {
  try {
    const { table, products } = req.body;

    const newOrder = await Order.create({ table, products });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json(error);
  }
}
