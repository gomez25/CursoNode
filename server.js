const express = require('express');
const app = express();
const PORT = 8080;

const Productos = [
  { id: 1, nombre: 'Producto 1' },
  { id: 2, nombre: 'Producto 2' },
  { id: 3, nombre: 'Producto 3' },
  { id: 4, nombre: 'Producto 4' },
  { id: 5, nombre: 'Producto 5' },
  { id: 6, nombre: 'Producto 6' },
  { id: 7, nombre: 'Productoo 7' },
  { id: 8, nombre: 'Producto 8' },
  { id: 9, nombre: 'Producto 9' },
  { id: 10, nombre: 'Producto 10' }
];

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/products', (req, res) => {
  const { limit } = req.query;
  if (limit) {
    res.json(Productos.slice(0, limit));
  } else {
    res.json(Productos);
  }
});

app.get('/products/:id', (req, res) => {
  const ProductoId = parseInt(req.params.id);
  const Producto = Productos.find(p => p.id === ProductoId);

  if (Producto) {
    res.json(Producto);
  } else {
    res.status(404).json({ error: 'No se encontró el producto' });
  }
});
app.listen(PORT, () => console.log("Server running on port " + PORT));