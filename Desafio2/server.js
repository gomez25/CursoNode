const express = require('express');
const handlebars = require('express-handlebars');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configura Handlebars como motor de vistas
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs');

// Lista de productos (simulación de base de datos)
const products = [];

// Ruta raíz para visualizar home.handlebars
app.get('/', (req, res) => {
  res.render('home', { products });
});

// Ruta /realtimeproducts para trabajar con Socket.IO
app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products });
});

// Configuración de Socket.IO
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Enviar la lista de productos al cliente cuando se conecta
  socket.emit('updateProducts', products);

  // Manejar la creación de un nuevo producto
  socket.on('addProduct', (newProduct) => {
    products.push(newProduct);
    // Emitir la lista actualizada a todos los clientes
    io.emit('updateProducts', products);
  });

  // Manejar la eliminación de un producto
  socket.on('deleteProduct', (productId) => {
    const index = products.findIndex((p) => p.id === productId);
    if (index !== -1) {
      products.splice(index, 1);
      // Emitir la lista actualizada a todos los clientes
      io.emit('updateProducts', products);
    }
  });

  // Manejar mensajes del cliente si es necesario
  socket.on('message', (message) => {
    console.log(`Mensaje del cliente: ${message}`);
  });
});

// Inicia el servidor en el puerto 3520
const PORT = 3520;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});