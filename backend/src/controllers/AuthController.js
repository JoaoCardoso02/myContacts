const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require('../database/connection.js')
require('dotenv/config')

class AuthController {
    async login (req, res) {

        const { email, password } = req.body

        const user = await knex('users').select(['id', 'name', 'email', 'password']).where('email', email).first()
        
        if (!user){
            return res.sendStatus(401)
        }

        const validPassword = await bcrypt.compareSync(password, user.password)
                
        if (!validPassword) {
            return res.sendStatus(401)
        }

        const token = jwt.sign({
            id: user.id, name: user.name, email: email
        }, process.env.SECRET_JWT, { expiresIn: '365d' })

        
        delete user.password
        return res.json({
            user,
            token
        })

    }
}

module.exports = new AuthController();