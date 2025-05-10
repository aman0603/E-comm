import Product from "../models/product.model.js";
export const getCartProducts = async (req, res) => {
  try {
    const products = await Product.find({ _id: { $in: req.user.cartItems } }); //find all products with id in cartItems

    //add quatity for each product
    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find((item) => item.id === product.id); //returns undefined or object of that item
      return { ...product.toJSON(), quantity: item.quantity };
    });
    res.status(200).json(cart);
  } catch (error) {
    console.log("Error in getCartItems controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.id == productId); //returns undefined or object of that item
    if (existingItem) {
      existingItem.quantity++;
    } else {
      user.cartItems.push({ id: productId, quantity: 1 }); //push new item to cartItems array with quantity 1 and id == productId
    }
  } catch (error) {
    console.log("Error in addToCart controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id != productId); //returns new array of filtered items
    }
    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error) {
    console.log("Error in removeAllFromCart controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find((item) => item.id == productId); //returns undefined or object of that item
    if (existingItem === 0) {
      user.cartItems = user.cartItems.filter((item) => item.id != productId);
      await user.save();
      return res.status(200).json(user.cartItems);
    }
    existingItem.quantity = quantity;
    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error) {
    console.log("Error in updateQuantity controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
