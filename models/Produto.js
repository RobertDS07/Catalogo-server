const mongoose = require('mongoose')

const ProdutoSchema = new mongoose.Schema({
    fotourl: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        uppercase: true,
        required: true
    },
    preço: {
        type: Number,
        required: true
    },
    tamanho: {
        type: String,
        uppercase: true
    },
    descriçao: {
        type: String,
    },
    tipo: {
        type: String,
        required: true
    }
}) 

// gambiarrazinha pois não achei um capitalize do mongoose... devo ter pesquisado errado não é possivel não existir
ProdutoSchema.pre('save', function (next) {
    this.tipo = this.tipo.slice(0, 1).toUpperCase() + this.tipo.slice(1)
    next()
})

const Produto = mongoose.model('Produto', ProdutoSchema)
module.exports = Produto