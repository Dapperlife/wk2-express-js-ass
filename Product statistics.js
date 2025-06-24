app.get('/api/products/stats', (req, res) => {
  const stats = {
    total: products.length,
    inStock: products.filter(p => p.inStock).length,
    categories: {}
  };
  
  products.forEach(p => {
    stats.categories[p.category] = (stats.categories[p.category] || 0) + 1;
  });
  
  res.json(stats);
});