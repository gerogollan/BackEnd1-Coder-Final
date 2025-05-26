

import ProductModel from "../models/product.model.js";

export default class ProductManager {
  async getProducts({ limit = 10, page = 1, sort, query } = {}) {
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : undefined,
      lean: true
    };

    let filter = {};
    if (query) {
      filter = {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } }
        ]
      };
    }

    return await ProductModel.paginate(filter, options);
  }

  async getProductById(id) {
    return await ProductModel.findById(id);
  }

  async addProduct(productData) {
    return await ProductModel.create(productData);
  }

  async updateProduct(id, updatedData) {
    return await ProductModel.findByIdAndUpdate(id, updatedData, { new: true });
  }

  async deleteProduct(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}



// import ProductModel from "../models/product.model.js";

// export default class ProductManager {
//   async getProducts({ limit = 10, page = 1, sort, query }) {
//     const options = {
//       limit: parseInt(limit),
//       page: parseInt(page),
//       sort: sort ? { price: sort === "asc" ? 1 : -1 } : undefined,
//     };

//     const filter = query ? { category: query } : {};

//     return await ProductModel.paginate(filter, options);
//   }

//   async getProductById(id) {
//     return await ProductModel.findById(id);
//   }

//   async addProduct(productData) {
//     return await ProductModel.create(productData);
//   }

//   async updateProduct(id, updatedData) {
//     return await ProductModel.findByIdAndUpdate(id, updatedData, { new: true });
//   }

//   async deleteProduct(id) {
//     return await ProductModel.findByIdAndDelete(id);

//   }
// }










// class ProductManager {
//   constructor(path) {
//     this.path = path;
//     // console.log("Ruta recibida por ProductManager:", this.path);
//   }

//   async getProducts() {
//     try {
//       const data = await fs.readFile(this.path, "utf-8");
//       const products = JSON.parse(data);
//       // console.log("Get Products working fine");
//       return products;
//     } catch (error) {
//       console.error("Error when try to read the file", error);
//       return [];
//     }
//   }

//   async getProductByID(pid) {
//     try {
//       const data = await fs.readFile(this.path, "utf-8");
//       const products = JSON.parse(data);
//       const product = products.find((product) => product.id == pid);
//       if (!product) {
//         console.log("Product not found");
//         return null;
//       }

//       console.log("Get Product by ID is working fine");
//       return product;
//     } catch (error) {
//       console.error("Error when try to read the file", error);
//       return null;
//     }
//   }

//   async addProduct(
//     title,
//     description,
//     code,
//     price,
//     status,
//     stock,
//     category,
//     thumbnails
//   ) {
//     try {
//       const data = await fs.readFile(this.path, "utf-8");
//       const products = JSON.parse(data);
//       const id =
//         products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

//       if (
//         !title ||
//         !description ||
//         !code ||
//         price == null ||
//         status == null ||
//         stock == null ||
//         !category ||
//         !Array.isArray(thumbnails)
//       ) {
//         console.log("Missing data, please complete all fields");
//         return null;
//       }

//       const codeExist = products.some((product) => product.code === code);
//       if (codeExist) {
//         console.log("Code already exists");
//         return null;
//       }

//       const newProduct = {
//         id,
//         title,
//         description,
//         code,
//         price,
//         status,
//         stock,
//         category,
//         thumbnails,
//       };

//       products.push(newProduct);
//       await fs.writeFile(this.path, JSON.stringify(products, null, 2));
//       console.log("Product added correctly");
//       return newProduct;
//     } catch (error) {
//       console.error("Error when the product is added", error);
//       return null;
//     }
//   }

//   async updateProduct(pid, updatedFields) {
//     try {
//       const data = await fs.readFile(this.path, "utf-8");
//       const products = JSON.parse(data);
//       const productIndex = products.findIndex((product) => product.id == pid);
//       if (productIndex === -1) {
//         console.log("Product not found");
//         return null;
//       }

//       delete updatedFields.id;

//       const updatedProduct = { ...products[productIndex], ...updatedFields };
//       products[productIndex] = updatedProduct;

//       await fs.writeFile(this.path, JSON.stringify(products, null, 2));
//       console.log("Product updated correctly");
//       return updatedProduct;
//     } catch (error) {
//       console.error("Error at update", error);
//       return null;
//     }
//   }

//   async deleteProduct(pid) {
//     try {
//       const data = await fs.readFile(this.path, "utf-8");
//       const products = JSON.parse(data);

//       const productIndex = products.findIndex((product) => product.id == pid);
//       if (productIndex === -1) {
//         console.log("Product not found");
//         return null;
//       }

//       const deletedProduct = products[productIndex];
//       products.splice(productIndex, 1);

//       await fs.writeFile(this.path, JSON.stringify(products, null, 2));
//       console.log("Product deleted correctly");
//       return deletedProduct;
//     } catch (error) {
//       console.error("Error al borrar el producto", error);
//       return null;
//     }
//   }
// }

// export default ProductManager;
