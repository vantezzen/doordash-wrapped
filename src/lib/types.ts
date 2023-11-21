import { z } from "zod";

export const OrderDetailsSchema = z.object({
  item: z.string(),
  category: z.string(), // e.g. "Fries", "Milkshake", "Burgers"
  store_name: z.string(), // e.g. "Taco Bell"
  unit_price: z.number(),
  quantity: z.number(),
  subtotal: z.number(), // unit_price * quantity
  created_at: z.string(),
  delivery_time: z.string().optional(), // Might be null if self-pickup, e.g. "2023-11-19 06:06:40.939000000"
  delivery_address: z.string(),
});
export type OrderDetails = z.infer<typeof OrderDetailsSchema>;

export const ItemSchema = z.object({
  name: z.string(),
  category: z.string(),
  unitPrice: z.number(),
  quantity: z.number(),
  subtotal: z.number(),
});
export type Item = z.infer<typeof ItemSchema>;

export const OrderSchema = z.object({
  storeName: z.string(),
  totalPrice: z.number(),
  createdAt: z.coerce.date(),
  deliveryTime: z.coerce.date().optional(),

  items: z.array(ItemSchema),
});
export type Order = z.infer<typeof OrderSchema>;

export const OrdersSchema = z.array(OrderSchema);
export type Orders = z.infer<typeof OrdersSchema>;

export const ShareImageDataSchema = z.object({
  totalOrders: z.number(),
  totalPrice: z.number(),
  totalDeliveryTime: z.string(),
  topCategory: z.string(),
  topStore: z.string(),
});

export type ShareImageData = z.infer<typeof ShareImageDataSchema>;
