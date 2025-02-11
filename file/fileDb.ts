import crypto from "node:crypto";
import { Dish, DishMutation } from "../types";
import readFile from "./readFile";
import writeFile from "./writeFile";

const filename = "./db.json";
let data: Dish[] = [];

const fileDb = {
  async init() {
    data = await readFile(filename);
  },

  async getItems() {
    return data;
  },

  async addItem(item: DishMutation) {
    const id = crypto.randomUUID();
    const product = { id, ...item };
    data.push(product);
    await this.save();
    return product;
  },

  async getItemById(id: string) {
    const product = data.find((item) => item.id === id);
    return product || null;
  },

  async deleteItemById(id: string) {
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) return null;

    const [deletedProduct] = data.splice(index, 1);
    await this.save();

    return deletedProduct;
  },

  async save() {
    await writeFile(filename, data);
  },
};

export default fileDb;
