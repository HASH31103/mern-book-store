import express from "express";

import {
  getProduct,
  createProduct,
  delProduct,
  updateProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.get("/", getProduct);
router.post("/", createProduct);
router.delete("/:id", delProduct);
router.put("/:id", updateProduct);

export default router;
