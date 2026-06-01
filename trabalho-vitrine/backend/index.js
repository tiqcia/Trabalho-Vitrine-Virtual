require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarBanco = require('./src/config/database'); 
const produtoRoutes = require('./src/routes/produtoRoutes'); 

const app = express();

app.use(cors());
app.use(express.json());

conectarBanco();

app.use('/produtos', produtoRoutes);

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));