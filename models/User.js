const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})


//  this will be fired when we register,save,change or modify the password
userSchema.pre('save', async function (next) {

    if(!this.isModified('password')) {
        return next()
    }

    const salt = bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, parseInt(salt))
    this.password = hashedPassword
    next()
})

// verify password
userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


module.exports = mongoose.model('User', userSchema)
