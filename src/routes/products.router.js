
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
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Ruta POST para crear productos
router.post("/", async (req, res) => {
  try {
    console.log("body recibido desde router:", req.body);

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




// import { Router } from "express";
// import ProductManager from "../managers/productManager.js";

// const router = Router();
// const productManager = new ProductManager();

// // Ruta GET con paginación y filtros
// router.get("/", async (req, res) => {
//   try {
//     const { limit, page, sort, query } = req.query;
//     const products = await productManager.getProducts({ limit, page, sort, query });

//     res.render("home", {
//       products: products.docs,
//       hasPrevPage: products.hasPrevPage,
//       hasNextPage: products.hasNextPage,
//       prevPage: products.prevPage,
//       nextPage: products.nextPage,
//       page: products.page,
//     });
//   } catch (error) {
//     res.status(500).send("Error al obtener productos.");
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     console.log(" body recibido desde router:" , req.body);
    
//     const existing = await ProductModel.findOne({ code: req.body.code });
// if (existing) {
//   return res.status(400).json({ error: "El código ya existe. Usá uno distinto." });
// }

//     const newProduct = await productManager.addProduct(req.body);
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(500).send("Error al agregar producto");
//   }
// });

// router.delete("/:pid", async (req, res) => {
//   try {
//     const { pid } = req.params;
//     await productManager.deleteProduct(pid);
//     res.send("Producto eliminado");
//   } catch (error) {
//     res.status(500).send("Error al eliminar producto");
//   }
// });


// export default router;


// import { Router } from "express";
// import ProductManager from "../managers/productManager.js";

// const router = Router();
// const productManager = new ProductManager("./src/data/products.json");


// //API
// // Obtener todos los productos
// router.get("/", async (req, res) => {
//   const products = await productManager.getProducts();
//   res.json(products);
// });

// // Obtener producto por ID
// router.get("/:pid", async (req, res) => {
//   const { pid } = req.params;
//   const product = await productManager.getProductByID(pid);
//   if (!product)
//     return res.status(404).json({ error: "Producto no encontrado" });
//   res.json(product);
// });

// // Agregar nuevo producto
// router.post("/", async (req, res) => {
//   const newProduct = await productManager.addProduct(
//     req.body.title,
//     req.body.description,
//     req.body.code,
//     req.body.price,
//     req.body.status,
//     req.body.stock,
//     req.body.category,
//     req.body.thumbnails
//   );
//   if (!newProduct)
//     return res
//       .status(400)
//       .json({
//         error:
//           "Missing fields, Invalid fields entry or product already in existence",
//       });
//   res.status(201).json(newProduct);
// });

// // Actualizar producto por ID
// router.put("/:pid", async (req, res) => {
//   const { pid } = req.params;
//   const updated = await productManager.updateProduct(pid, req.body);
//   if (!updated) return res.status(404).json({ error: "Product not found" });
//   res.json(updated);
// });

// // Eliminar producto por ID
// router.delete("/:pid", async (req, res) => {
//   const { pid } = req.params;
//   const deleted = await productManager.deleteProduct(pid);
//   if (!deleted) return res.status(404).json({ error: "Product not found" });
//   res.json({ message: "Product deleted correctly", deleted });
// });

// //Para el 404
// router.use((req, res) => {
//   res.status(404).send("Error 404, Page not found, try to go back!!");
// });
// //FIN API


// export default router;
