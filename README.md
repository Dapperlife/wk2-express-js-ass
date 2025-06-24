# Product API

## Setup
1. Clone repository
2. `npm install express body-parser uuid dotenv`
3. Create `.env` file
4. `npm start`

## API Endpoints

### Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/search?term=...` - Search products
- `GET /api/products/stats` - Get statistics

## Example Request
```bash
curl -X POST http://localhost:3000/api/products \
  -H "x-api-key: your-key" \
  -H "Content-Type: application/json" \
  -d '{"name":"Tablet","price":299,"category":"electronics"}'
```