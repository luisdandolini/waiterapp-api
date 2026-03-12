import type { Request, Response } from "express";
import { Order } from "../../models/Order.js";

export async function deleteOrder(req: Request, res: Response) {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order is not exist" });
    }

    await Order.findByIdAndDelete(orderId);

    res.status(200).json({ message: "Order deleted sucess!" });
  } catch (error) {
    res.status(500).json(error);
  }
}
