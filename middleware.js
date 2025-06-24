
//Custom logger middleware

const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
app.use(logger);


// Validation middleware


const validateProduct = (req, res, next) => {
  const { name, price, category } = req.body;
  const errors = [];
  
  if (!name) errors.push('Name is required');
  if (!price) errors.push('Price is required');
  if (!category) errors.push('Category is required');
  if (price && isNaN(price)) errors.push('Price must be a number');
  
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  next();
};


// Apply to POST and PUT
app.post('/api/products', validateProduct);
app.put('/api/products/:id', validateProduct);

