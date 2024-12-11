const { v4 } = require("uuid")
const Service = require("../services/Services")
const updateBodyCreator = require("../utils/updateBodyCreator")
const userModel = new Service("user")

class UserController{

    static async getAllUsers(req,res,next){
        try {
            const search = await userModel.findAll()
            return res.status(200).json({msg: "Todos os usuarios registrados", results: search, status: 200})
        } catch (error) {
            next(error)
        }
    }

    static async getUserById(req,res,next){
        const {id} = req.params
        try {
            const searchUser = await userModel.findById(id)
            if(!searchUser){
                return res.status(401).json({msg: "Usuario não existe", results: false, status: 401})
            }

            return res.status(200).json({msg: "Usuario encontado com sucesso", results: searchUser, status: 200})
        } catch (error) {
            next(error)
        }
    }

    static async createNewUser(req,res,next){
        try {
            const {name, email, phone} = req.body
            await userModel.createNewRegister({name, email, phone})
            return res.status(201).json({msg: "Usuario criado com sucesso", results: true, status: 201})
        } catch (error) {
            next(error)
        }
    }

    static async updateUser(req,res,next){
        try {
            const {id} = req.params
            const payload = updateBodyCreator(req.body)

            await userModel.updateById(id, payload)

            const newUser = await userModel.findById(id)

            return res.status(201).json({msg: "Usuario atualizado com sucesso.", results: newUser, status: 201})
        } catch (error) {
            next(error)
        }
    }

    static async deleteUser(req,res,next){
        try {
            const {id} = req.params

            const user = await userModel.findById(id)
            if(user){
                await userModel.removeById(id)
                return res.status(201).json({msg: "Usuario removido com sucesso!", resutls: user, status: 200})
            }
            return res.status(201).json({msg: "Usuario não existe", resutls: false, status: 200})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController