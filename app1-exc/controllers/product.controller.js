const Product = require('../models/product.model')
const logger = require('../logger/logger') 

exports.findAll = async(req, res) => {
  console.log("Find all products");

  try {
    const result = await Product.find();
    res.status(200).json({data: result});
    logger.debug("Success in reading all products");
    logger.info("Success in reading all products");
  } catch (err) {
    console.log(`Problem in reading products, ${err}`)
    logger.error(`Problem in reading all products , ${err}`);
  }
}

exports.findOne = async(req, res) => {
  console.log("Find a product");

  const product = req.params.product;
  try {
    const result = await Product.findOne({ product: product})
    res.status(200).json({data: result});
  } catch(err) {
    console.log(`Problem in reading product, ${err}`)
    logger.error(`Problem in reading a product, ${err}`);
  }
}

exports.create = async(req, res) => {
  console.log("Insert product")

    const newProduct = new Product({
       product: req.body.product,
       cost: req.body.cost,
       description: req.body.description,
       quantity: req.body.quantity
    })

  try {
    const result = await newProduct.save();
    res.status(200).json({data: result});
    console.log("Product saved");
  } catch(err) {
    res.status(400).json({data: err})
    console.log("Problem in saving product", err);
    logger.error(`Problem in inserting a product, ${err}`);
  }
}

exports.update = async(req, res) => { 
  console.log("Update product with product name: ", product);
 
  const updateProduct = { 
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity
  };
  const product = req.params.product;
  try {
    const result = await Product.findOneAndUpdate(
      {product: product},
      updateProduct,
      {new: true}
    )
    res.status(200).json({data: result});
    console.log("Success in updating product: ", product)
  } catch(err){
    res.status(400).json({data: err})
    console.log("Problem in updating product: ", product);
    logger.error(`Problem in updating a product, ${err}`);
  }
};

exports.delete = async(req, res) => {
  console.log("Delete product:", product);

  const product = req.params.product;
  try {
    const result = await Product.findOneAndDelete({product: product})
    res.status(200).json({data: result});
    console.log("Success in deleting product", product);
  } catch(err) {
    res.json({data: err});
    console.log("Problem in deleting product");
    logger.error(`Problem in deleting a product, ${err}`);
  }
};