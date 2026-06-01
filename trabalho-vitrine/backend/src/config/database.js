const mongoose = require('mongoose');

const conectarBanco = () => {
  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pinterestStore')
    .then(() => console.log("Conectado ao MongoDB"))
    .catch(err => console.error("Erro ao conectar:", err));
};

module.exports = conectarBanco;