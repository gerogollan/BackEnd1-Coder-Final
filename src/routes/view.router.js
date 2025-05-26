import { Router } from "express";
import path from "path";

import ProductModel from "../models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, query } = req.query;

    let filter = {};
    if (query) {
      filter = { $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ] };
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : undefined,
      lean: true,
    };

    const result = await ProductModel.paginate(filter, options);

    res.render("home", {
      products: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error cargando productos");
  }
});

export default router;



// import { Router } from "express";
// import ProductManager from "../managers/productManager.js";
// import path from "path";

// import Product from "../models/product.model.js";

// const router = Router();
// const productFilePath = path.join(process.cwd(), "src", "data", "products.json");
// const productManager = new ProductManager(productFilePath);

// router.get("/", async (req, res) => {
//   try {
//     const { page = 1, limit = 5, sort, query } = req.query;

//     let filter = {};
//     if (query) {
//       filter = { $or: [
//         { title: { $regex: query, $options: "i" } },
//         { description: { $regex: query, $options: "i" } },
//       ] };
//     }

//     const options = {
//       page: parseInt(page),
//       limit: parseInt(limit),
//       sort: sort ? { price: sort === "asc" ? 1 : -1 } : undefined,
//       lean: true,
//     };

//     const result = await Product.paginate(filter, options);

//     res.render("home", {
//     products: result});
//   } catch (err) {
//     res.status(500).send("Error cargando productos");
//   }
// });

// //ProductListHome
// // router.get("/", async (req, res) => {
// //   const { limit, page, sort, query } = req.query;
// // const products = await productManager.getProducts({ limit, page, sort, query });
// //   res.render("home", { products , layout: "main" });
// // });

// //RealtimeProducts
// router.get("/realtimeproducts", async (req, res) => {
//    try{
//     const products = await productManager.getProducts();
//     res.render("realtimeproducts");
//    }catch(error){
//     console.error(`error al cargar los productos ${error} `)
//     res.status(500).send("Error al cargar la vista")
//    }
  

// });

// //realtimeproducts


// // const products = await productManager.getProducts();
// // res.render("realtimeproducts", { products , layout: "main"});

// export default router;
