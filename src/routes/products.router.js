
import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import ProductModel from "../models/product.model.js"; // Asegurate de importar esto si no lo tenías

const router = Router();
const productManager = new ProductManager();

// Ruta GET con paginación y filtros
router.get("/", async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;
    const products = await productManager.getProducts({ limit, page, sort, query });

    res.render("home", {
      products: products.docs,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
    });
    // res.json(products)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Ruta POST para crear productos
router.post("/", async (req, res) => {
  try {
    console.log("Recibido:", req.body);

    const existing = await ProductModel.findOne({ code: req.body.code });
    if (existing) {
      return res.status(400).json({ error: "El código ya existe. Usá uno distinto." });
    }

    // Validar y convertir tipos si llegan como string
    req.body.price = Number(req.body.price);
    req.body.stock = Number(req.body.stock);

    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
    
  } catch (error) {
    console.error("Error en POST /api/products:", error);
    res.status(500).json({ error: "Error al agregar el producto" }); 
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    await productManager.deleteProduct(pid);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

export default router;



