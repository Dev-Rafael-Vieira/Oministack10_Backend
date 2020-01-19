const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect("mongodb://localhost:27017/oministack10_backend", { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.json()); // deve vir antes das rotas
app.use(routes);


app.listen(3333);