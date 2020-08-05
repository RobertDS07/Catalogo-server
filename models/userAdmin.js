const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const adminSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
})

adminSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    await next()
})

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin