const express = require('express');
const app = express();
const PORT = 5000;

const Productos = [
  { id: 1, name: 'Producto 1' },
  { id: 2, name: 'Producto 2' },
  { id: 3, name: 'Producto 3' },
  { id: 4, name: 'Producto 4' },
  { id: 5, name: 'Producto 5' },
  { id: 6, name: 'Producto 6' },
  { id: 7, name: 'Productoo 7' },
  { id: 8, name: 'Producto 8' },
  { id: 9, name: 'Producto 9' },
  { id: 10, name: 'Producto 10' }
];

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Route to get all Productos
app.get('/productos', (req, res) => {
  const { limit } = req.query;
  if (limit) {
    res.json(Productos.slice(0, limit));
  } else {
    res.json(Productos);
  }
});

app.get('/productos/:id', (req, res) => {
  const ProductoId = parseInt(req.params.id);
  const Producto = Productos.find(p => p.id === ProductoId);

  if (Producto) {
    res.json(Producto);
  } else {
    res.status(404).json({ error: 'No se encontró el producto' });
  }
});
app.listen(PORT, () => console.log("Server running on port " + PORT));