import express from "express";
import fileDb from "../file/fileDb";
import { getImageURL, imagesUpload } from "../file/multer";
import { DishMutation } from "../types";

const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  const products = await fileDb.getItems();
  res.send(products);
});

productsRouter.get("/:id", async (req, res) => {
  const products = await fileDb.getItems();
  const product = products.find((p) => p.id === req.params.id);
  res.send(product);
});

productsRouter.post("/", imagesUpload.single("image"), async (req, res) => {
  const product: DishMutation = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageLink: req.body.imageLink,
    image: req.file ? getImageURL(req.file.filename) : null,
  };

  const savedProduct = await fileDb.addItem(product);
  res.send(savedProduct);
});

productsRouter.delete("/:id", async (req, res: any) => {
  const deletedProduct = await fileDb.deleteItemById(req.params.id);

  if (!deletedProduct) {
    return res.status(404).send({ message: "Продукт не найден" });
  }

  res.send({ message: "Продукт удалён", deletedProduct });
});

export default productsRouter;
