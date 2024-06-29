const express = require('express');
const app = express();
const cors = require('cors');

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());


//Routes
app.use(require('./src/routes/url'));

app.listen(3002);
console.log('Servidor ejecutandose en el puerto 3002');