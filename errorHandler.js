//Custom error classes

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message, details) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
    this.details = details;
  }
}

//Update routes to use errors

app.get('/api/products/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) throw new NotFoundError('Product not found');
  res.json(product);
});

//Global error handler

app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const status = err.statusCode || 500;
  const response = {
    error: err.message || 'Internal Server Error'
  };
  
  if (err.details) response.details = err.details;
  if (process.env.NODE_ENV === 'development') response.stack = err.stack;
  
  res.status(status).json(response);
});