// Update GET /api/products
app.get('/api/products', (req, res) => {
  let result = [...products];
  
  // Filter by category
  if (req.query.category) {
    result = result.filter(p => p.category === req.query.category);
  }
  
  // Filter by inStock
  if (req.query.inStock) {
    const inStock = req.query.inStock === 'true';
    result = result.filter(p => p.inStock === inStock);
  }
  
  // Search by name
  if (req.query.search) {
    const term = req.query.search.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(term));
  }
  
  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = page * limit;
  
  res.json({
    data: result.slice(start, end),
    pagination: {
      total: result.length,
      page,
      limit,
      totalPages: Math.ceil(result.length / limit)
    }
  });
});