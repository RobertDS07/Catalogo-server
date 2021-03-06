const router = require('express').Router()
const Produto = require('../models/Produto')

const authMiddleware = require('../middlewares/auth')

// tudo passa pelo middleware antes de ir para as outras rotas 
router.use(authMiddleware)

// app.post('/createAdmin', async (req, res) => {
//     try {
//         const admin = await Admin.create(req.body)

//         return res.send({admin})
//     } catch (err) {
//         console.error(err)
//     }
// })

router.post('/', async (req, res) => {
    try {
        const produtos = await Produto.find().sort(req.body.sort)

        res.send(produtos)
    } catch (err) { console.error(err) }
})

router.post('/add', async (req, res) => {
    try {
        const produto = await Produto.create(req.body)

        return res.redirect(process.env.URL_SITE_FRONT)
    } catch (err) { console.error(err) }
})

router.post('/delete', async (req, res) => {
    try {
        await Produto.deleteOne({ _id: req.body.id })
        return res.redirect(process.env.URL_SITE_FRONT)
    } catch (err) { console.error(err) }
})

router.post('/update', async (req, res) => {
    try {
        // aqui eu estou pegando tudo que o usuario enviou da parte de editar produtos, e como ele envia tudo de uma vez eu optei por tratar isso aqui no back, desse jeito todos os valores vazios serão deletados para no final passar apenas os que o usuario realment quer alterar 
        for (const [key, value] of Object.entries(req.body)) {
            if(value == ''){
                delete req.body[key]
            }
          }
        await Produto.findByIdAndUpdate(req.body.id, req.body)
        return res.redirect(process.env.URL_SITE_FRONT)
    } catch(err) { console.error(err) }
})

module.exports = router