import { UUID } from "crypto";

// export type Product = {
//   id: UUID;
//   title: string;
//   description: string;
//   image: File | null | string;
//   price: string;
//   sell: string;
//   rating: string;
//   count: string;
// };

export type ProductWithoutId = Omit<Product, "id">;

export interface Dish {
  id: UUIDz;
  name: string;
  description: string;
  image: File | null | string;
  imageLink: string;
  price: string;
}
export interface DishMutation {
  name: string;
  description: string;
  image: File | null | string;
  imageLink: string;
  price: string;
}
