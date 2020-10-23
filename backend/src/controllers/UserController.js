const express = require('express')
const bcrypt = require('bcrypt')
const knex = require('../database/connection.js')

class UserController {

    async getUser (req, res) {

        const data = await knex('users').select(['email', 'name']).where('id', req.userId).first();
        return res.json(data);
    }

    async getUsers (req, res) {

        const data = await knex('users').select(['id', 'email', 'name']);
        return res.json(data);
    }

    async createUser (req, res) {

        const { email, password, name } = req.body;
        const isEmailUsed = await knex('users').select('*').where('email', email);

        if (!isEmailUsed.length) {
            
            const passwordHashed = await bcrypt.hash(password, 12);
    
            try {
                await knex('users').insert({email, password: passwordHashed, name});
                return res.sendStatus(200);
            }
            catch {
                res.sendStatus(409);
            }

        } else {
            return res.sendStatus(422);
        }
    
        
    }

    async deleteUser (req, res) {

        const userId = req.userId;

        try {
            await knex('contacts').where('id_user', userId).del();
            await knex('users').where('id', userId).del();

            return res.sendStatus(200);
        } catch (e) {
            return res.sendStatus(404);
        }

        // if (isRegistred) {
        //     return res.sendStatus(200);
        // } else {
        //     return res.sendStatus(404);
        // }
    }

    async alterData (req, res) {
        const { email, name } = req.body;

        const isEmailUsed = await knex('users').select('*').where('email', email).whereNot('id', req.userId).first();

        if (typeof isEmailUsed === 'undefined') {

            try {
                await knex('users').update({ email, name }).where('id', req.userId);
                return res.sendStatus(200);
            }
            catch {
                res.sendStatus(409);
            }

        } else {
            return res.status(422).send({ email: true });
        }
    
    }

    async alterPassword (req, res) {

        const { password, newPassword } = req.body;
        const dataUser = await knex('users').select(['password']).where('id', req.userId).first();

        if (dataUser) {
            if (bcrypt.compareSync(password, dataUser['password'])) {
                const passwordHashed = await bcrypt.hash(newPassword, 12);

                try {
                    await knex('users').update({ password: passwordHashed }).where('id', req.userId);
                    return res.sendStatus(200);

                } catch (e) {
                    return res.sendStatus(500);
                }
            }
            else {

                return res.sendStatus(401);
            }
        }

        return res.sendStatus(401);
    }


    
}

module.exports = new UserController();