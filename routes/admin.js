const router = require('express').Router()
const Produto = require('../models/Produto')

const authMiddleware = require('../middlewares/auth')


router.use(authMiddleware)

// router.post('/', async (req, res) => {
//     try {
//         const admin = await Admin.create(req.body)

//         return res.send({admin})
//     } catch (err) {
//         console.error(err)
//     }
// })

router.post('/', async (req, res) => {
    try {
        const produtos = await Produto.find().sort({ 'preço': 'asc' })

        res.send(produtos)
    } catch (err) { console.error(err) }
})

router.post('/tipos', async (req, res) => {
    const itens = await Produto.distinct('tipo')
    res.send(itens)
})

router.post('/add', async (req, res) => {
    try {
        const produto = await Produto.create(req.body)

        return res.redirect('http://localhost:3000/admin/catalogo')
    } catch (err) { console.error(err) }
})

router.post('/delete', async (req, res) => {
    try {
        await Produto.deleteOne({ _id: req.body.id })
        return res.redirect('http://localhost:3000/admin/catalogo')
    } catch (err) { console.error(err) }
})

router.post('/update', async (req, res) => {
    try {
        await Produto.findByIdAndUpdate(req.body.id, req.body)
        res.redirect('http://localhost:3000/admin/catalogo')
    } catch(err) { console.error(err) }
})

module.exports = router