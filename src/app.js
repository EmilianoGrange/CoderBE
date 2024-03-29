import express from 'express';

import { engine } from 'express-handlebars';

import { Server } from 'socket.io';

import mongoose from 'mongoose';

import viewsRouter from './routes/views.router.js';

import productRouter from './routes/products.router.js';

import cartRouter from './routes/carts.router.js';

const app = express();

mongoose.connect('mongodb://localhost:27017/ecommerce');

app.engine('handlebars', engine());
app.set('views', 'src/views');
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', viewsRouter);

app.use('/api/products', productRouter);

app.use('/api/carts', cartRouter);

app.use((req, res, next) => {
    res.render('404');
});

const server = app.listen(8080, () => console.log(`Server listening on port ${server.address().port}`));

server.on('error', err => console.log(`Error en el servidor ${err.message}`));

const io = new Server(server);

io.on("connection", socket => {
    console.log('New client connected!');
    socket.on('productList', data => {
        io.emit('updatedProducts', data);
    });
});