// server.js - Optimized RESTful API implementation

const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Custom middleware for product validation
const validateProduct = (req, res, next) => {
  const { name, price, category } = req.body;
  const errors = [];
  
  if (!name) errors.push('Name is required');
  if (!price) errors.push('Price is required');
  if (!category) errors.push('Category is required');
  if (price && isNaN(price)) errors.push('Price must be a number');

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }
  
  next();
};

// In-memory database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Format response envelope
const formatResponse = (data, message = '') => ({
  success: true,
  message,
  data
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello world! How are you cousins');
});

// GET all products
app.get('/api/products', (req, res) => {
  res.json(formatResponse(products));
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({
      error: {
        code: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
        id: req.params.id
      }
    });
  }
  res.json(formatResponse(product));
});

// POST create product
app.post('/api/products', validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description: description || '',
    price: Number(price),
    category,
    inStock: Boolean(inStock)
  };
  
  products.push(newProduct);
  res.status(201).json(formatResponse(newProduct, 'Product created'));
});

// PUT update product
app.put('/api/products/:id', validateProduct, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({
      error: {
        code: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
        id: req.params.id
      }
    });
  }
  
  const { id, ...updates } = req.body; // Prevent ID modification
  const updatedProduct = {
    ...products[index],
    ...updates,
    id: req.params.id // Preserve original ID
  };
  
  products[index] = updatedProduct;
  res.json(formatResponse(updatedProduct, 'Product updated'));
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) {
    return res.status(404).json({
      error: {
        code: 'PRODUCT_NOT_FOUND',
        message: 'Product not found',
        id: req.params.id
      }
    });
  }
  
  const [deletedProduct] = products.splice(productIndex, 1);
  res.json(formatResponse(deletedProduct, 'Product deleted'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;