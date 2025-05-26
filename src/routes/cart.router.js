import { Router } from "express";
import CartManager from "../managers/cartManager.js";
import ProductModel from "../models/product.model.js"; 

const router = Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: "Error creando carrito" });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartManager.getCartById(cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error buscando carrito" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid} = req.params;
  try {
    const updatedCart = await cartManager.addProductToCart(cid, pid);
    res.json(updatedCart);
  }catch (error){
    console.error("Error en addProductToCart", error);
    if (error.message === "Product not found"){
      return res.status(404).json({ error: "product not found"});
    }
   

    if (error.message === "Cart not found"){
      return res.status(404).json({ error: "cart not found" });
    }
    res.status(400).json({ error: "Error at adding the product in the cart, check the id's" });
  }
});

export default router;
