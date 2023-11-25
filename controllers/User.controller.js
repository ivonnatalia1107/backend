const User = require('../models/User.model')
const bcrypt = require('bcrypt')

const signUp = async (req, res) => {
    try {
        const { mail, password } = req.body
        const existingUser = await User.findOne({mail})
        if(existingUser){
            return res.json({
                message: "mail registrado"
            })
        }
        const user = new User(req.body)
        user.hashPassword(password)
        await user.save()
        return res.json({
            message: 'Usuario creado',
            detail: user.onSignUpGenerateJWT()
        })
    } catch (err) {
        return res.json({
            message: 'Error',
            detail: err.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { mail, password } = req.body
        const userFound = await User.findOne({ mail })
        if(!userFound) {
            return res.json({
                message: "usuario no encontrado, registrate "
            })
        }
        const isCorrectPassword = await bcrypt.compareSync(password, userFound.password)
        if (!isCorrectPassword) {
            return res.json({
                message: 'acceso denegado, clave invalida'
            })
        }

        return res.json({
            message: 'Ok',
            detail: { user: userFound, token: userFound.generateJWT() }
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const getUsers = async (req, res) => {
    try {
        const resp = await User.find()
        return res.json({
            message: 'Usuarios',
            detail: resp
        })
    } catch (err) {
        return res.json({
            message: 'Error',
            detail: err.message
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const newData = req.body

        const resp = await User.findByIdAndUpdate(
            newData._id,
            { $set: newData },
            { new: true })

        return res.json({
            message: 'Usuario actualizado',
            detail: resp
        })
    } catch (err) {
        return res.json({
            message: 'Error',
            detail: err
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const resp = await User.findByIdAndDelete(req.body._id)

        return res.json({
            message: 'Usuario eliminado',
            detail: resp
        })
    } catch (err) {
        return res.json({
            message: 'Error',
            detail: err
        })
    }
}

module.exports = {
    signUp,
    login,
    getUsers,
    updateUser,
    deleteUser
}