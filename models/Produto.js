const mongoose = require('mongoose')

const ProdutoSchema = new mongoose.Schema({
    fotourl: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    preço: {
        type: String,
        required: true
    },
    tamanho: {
        type: String,
    },
    descriçao: {
        type: String,
    },
    tipo: {
        type: String,
        required: true
    }
}) 

const Produto = mongoose.model('Produto', ProdutoSchema)
module.exports = Produto