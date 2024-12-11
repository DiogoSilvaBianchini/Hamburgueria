const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Service = require("../services/Services")
const { Joi } = require("express-validation")
const service = new Service("admin")

const encryptedPassword = async (password) => {
    try {
        const salt = await bcryptjs.genSalt(10)
        hash = await bcryptjs.hash(password, salt)
        return hash
    } catch (error) {
        throw new Error(error)
    }
}

const authGoogleUser = async (req, res, next) => {
    const {email} = req.body
    try {
        const user = await service.findOne({where: {email}})
        
        if(user.length == 0){
            return res.status(200).json({results: "Usuario não encontrado", status: 301})
        }else{
            req.payload = {id: user.id, email: user.email}
            next()
        }
    } catch (error) {
        next(error)
    }
}

const authUser = async (req,res,next) => {
    const {email, password} = req.body

    try {
        const user = await service.findOne({
            where: {
                email
            }
        })
        
        if(!user) return res.status(401).json({results: "E-mail ou senha incorreto", status: 401})

        const compare = await bcryptjs.compare(password, user.password)
        
        if(compare){
            const payload = {id: user.id, email: user.email}
            next(payload)
        }else{
            return res.status(401).json({results: "E-mail ou senha incorreto", status: 401})
        }
    } catch (error) {
        next(error)
    }
}

const checkToken = async (req, res, next) => {
    const {token} = req.body

    try{
        const bearerToken = token.split(" ", 2)[1]
        const verify = await jwt.verify(bearerToken, process.env.SECRET_TOKEN)
        req.token = verify
        next()
    }
    catch (error) {
        return res.status(401).json({results: "Token inválido", status: 401})
    }
}

const checkin = async (req, res, next) => {
    const {authorization} = req.headers
    try {
        const bearerToken = authorization.split(" ", 2)[1]
        const token = await jwt.verify(bearerToken, process.env.SECRET_TOKEN)
        const user = await service.findOne({where: {email: token.email}})
        if(user){
            const payLoad = {id: user.id, name: user.name, email: user.email}
            return res.status(200).json({msg: "Token authenticado", results: payLoad, status: 200})
        }else{
            return res.status(401).json({msg: "Token inválido", results: false, status: 401})
        }
    } catch (error) {
        return res.status(401).json({msg: "Token inválido", results: false, status: 401})
    }
}

const checkinNext = async (req,res,next) => {
    const {authorization} = req.headers
    try {
        const bearerToken = authorization.split(" ", 2)[1]
        const token = await jwt.verify(bearerToken, process.env.SECRET_TOKEN_RECOVER)

        const user = await service.findOne({where: {id: token.id}})

        const payload = {id: user.id, name: user.name, email: user.email}
        next(payload)
    } catch (error) {
        return res.status(401).json({results: "Token inválido", status: 401})
    }
}

const userRegisterFormValidation = {
    body: Joi.object({
        name: 
            Joi.string()
            .required(),
        email: 
            Joi.string()
            .email()
            .required(),
        password:
            Joi.string()
            .min(8)
            .max(30)
            .regex(/[a-zA-Z0-9]/)
            .required()
    })
}

module.exports = {
    encryptedPassword,
    authUser,
    checkToken,
    checkin,
    checkinNext,
    userRegisterFormValidation,
    authGoogleUser
}