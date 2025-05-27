import { Router } from "express";
import ProductModel from "../models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, query } = req.query;

    let filter = {};
    if (query) {
      filter = {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      };
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : undefined,
      lean: true,
    };

    const result = await ProductModel.paginate(filter, options);

    res.render("home", {
      products: result, query,           // Solo el array de productos
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
      },
      query,
      sort,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error cargando productos");
  }
});

export default router;



//<zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
// import { Router } from "express";
// import path from "path";

// import ProductModel from "../models/product.model.js";

// const router = Router();



// router.get("/", async (req, res) => {
//   try {
//     const { page = 1, limit = 10, sort, query } = req.query;

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

//     const result = await ProductModel.paginate(filter, options);

//     res.render("home", {
//       products: result,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error cargando productos");
//   }
// });

// export default router;

