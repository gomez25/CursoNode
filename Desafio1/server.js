const express = require('express');
const app = express();
const PORT = 5000;

const Palabras = [
  { id: 1, frase: 'Frase 1' },
  { id: 2, frase: 'Frase 2' },
  { id: 3, frase: 'Frase 3' },
  { id: 4, frase: 'Frase 4' },
  { id: 5, frase: 'Frase 5' },
  { id: 6, frase: 'Frase 6' },
  { id: 7, frase: 'Frase 7' },
  { id: 8, frase: 'Frase 8' },
  { id: 9, frase: 'Frase 9' },
  { id: 10, frase: 'Frase 10' }
];

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//app.get('/api/frase', (req, res) => {
//  const { limit } = req.query;
//  if (limit) {
//    res.json(Productos.slice(0, limit));
//  } else {
//    res.json(Productos);
//  }
//});

app.get('/api/frase', (req, res) => {
  res.json(Palabras);
});

app.post('/api/palabras', (req, res) => {
 const body2 = req.body;
 res.status(200).json(body2);
});

app.get('/api/palabras/:pos', (req, res) => {
  const ProductoId = parseInt(req.params.id);
  const Producto = Productos.find(p => p.id === ProductoId);

  if (Producto) {
    res.json(Producto);
  } else {
    res.status(404).json({ error: 'No se encontró el producto' });
  }
});
app.listen(PORT, () => console.log("Server running on port " + PORT));