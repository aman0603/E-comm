import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

/**
 * @description Get all products. Does not return any filtered or sorted result.
 * @returns {json} A JSON object containing all products.
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}); //find all products
    res.status(200).json({ products });
  } catch (error) {
    console.log("Error in getAllProducts controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @description Get all featured products. First checks if the featured products are present in Redis cache. If present, returns from cache. If not, fetches from MongoDB and stores in Redis for future quick access.
 * @returns {json} A JSON object containing the featured products.
 */
export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      res.status(200).json(JSON.parse(featuredProducts));
    }
    // if not  in redis then fetch from mongoose
    //.lean() return a plane javascript object instead of mongoose document which is good for performance
    featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts) {
      res.status(404).json({ message: "No featured products found" });
    }

    // store in redis for future quick access
    await redis.set("featured_products", JSON.stringify(featuredProducts));

    res.status(200).json(featuredProducts);
  } catch (error) {
    console.log("Error in getFeaturedProducts controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

/**
 * @description Create a new product in the database.
 * @param {Object} req.body - The request body containing the product details.
 * @param {string} req.body.name - The name of the product.
 * @param {number} req.body.price - The price of the product.
 * @param {string} req.body.description - The description of the product.
 * @param {string} req.body.image - The image of the product (optional).
 * @param {string} req.body.category - The category of the product.
 * @returns {json} A JSON object containing the newly created product.
 */
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, category } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      price,
      description,
      image: cloudinaryResponse.secure_url ? cloudinaryResponse.secure_url : "",
      category,
    });
    res.status(201).json(product);
  } catch (error) {
    console.log("Error in createProduct controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Deletes a product based on the provided ID. If the product has an associated image,
 * it also deletes the image from Cloudinary.
 *
 * @param {Object} req - The request object containing the product ID in params.
 * @param {Object} res - The response object used to send back the appropriate HTTP status and message.
 * @throws {Error} If there is an error during the deletion process,
 *                 it logs the error and responds with a 500 status code.
 *
 * @returns {void} Responds with a 404 status code if the product is not found,
 *                 otherwise, it responds with a 500 status code on error.
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.image) {
      const publicid = product.image.split("/").pop().split(".")[0]; //get public id from image url
      try {
        await cloudinary.uploader.destroy(`products/${publicid}`); //delete image from cloudinary
        console.log("Image deleted successfully");
      } catch (error) {
        console.log("Error in deleting image from cloudinary", error.message);
        res.status(500).json({ message: "Internal server error" });
      }
    }
    await Product.findByIdAndDelete(req.params.id);
  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Returns an array of 3 random products from the products collection.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {json} A JSON object containing the 3 random products.
 */
export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $sample: { size: 3 } },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          image: 1,
          description: 1,
        },
      },
    ]);
    res.json(products);
  } catch (error) {
    console.log("Error in getRecommendedProducts controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

/**
 * Retrieves products based on the specified category.
 *
 * @param {Object} req - The request object containing the category parameter.
 * @param {Object} res - The response object used to send back the HTTP status and products data.
 * @throws {Error} If there is an error during the retrieval process, logs the error and responds with a 500 status code.
 * @returns {void} Responds with a 200 status code and the products array on success, otherwise, responds with a 500 status code on error.
 */
export const getProductsByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    console.log("Error in getProductsByCategory controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductsCache();
      res.status(200).json(updatedProduct);
    }else{
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error in toggleFeaturedProduct controller", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

/**
 * Updates the Redis cache with the featured products.
 * Retrieves all products with isFeatured set to true and stores them in the
 * "featured_products" key in Redis.
 * @throws {Error} If there is an error during the retrieval or storage of the
 *                 featured products, logs the error and continues.
 * @returns {void} Does not return anything.
 */
async function updateFeaturedProductsCache() {
  try{

    const featuredProducts = await Product.find({ isFeatured: true }).lean();//give all the featured products
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  }catch(err){
    console.log("Error in updating featured products cache", err.message);
  }
}