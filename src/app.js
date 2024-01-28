import express from 'express';

import handlebars from 'express-handlebars';

import { Server } from 'socket.io';

import viewsRouter from './routes/views.router.js';

import productRouter from './routes/products.router.js';

import cartRouter from './routes/carts.router.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', 'src/views');
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use('/', viewsRouter);

app.use('/api/products', productRouter);

app.use('/api/carts', cartRouter);

const server = app.listen(8080, () => console.log(`Server listening on port ${server.address().port}`));

server.on('error', err => console.log(`Error en el servidor ${err.message}`));

const io = new Server(server);

io.on("connection", socket => {
    console.log('New client connected!');
    socket.on('productList', data => {
        io.emit('updatedProducts', data);
    });
});