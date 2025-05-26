import Cart from '../models/cart.model.js'; // ruta según tu proyecto
import ProductModel from '../models/product.model.js'; 

class CartManager {
  async createCart() {
    const newCart = new Cart({ products: [] });
    await newCart.save();
    return newCart;
  }

  async getCartById(cid) {
    return Cart.findById(cid).populate('products.product').lean();
  }

  async addProductToCart(cid, pid) {

      const productExist = await ProductModel.findById(pid);
      if (!productExist) {
        throw new Error('Product not found');
      }



    const cart = await Cart.findById(cid);
    if (!cart) return null;

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === pid
    );

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    return cart;
  }
}

export default CartManager;
