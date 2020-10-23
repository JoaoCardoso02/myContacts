const knex = require('../database/connection.js')

class ContactController {

    async getContactID (req, res) {

        const id_contact = req.params.id;
        const id_user = req.userId;

        const data = await knex('contacts').select(['email', 'name']).where('id', id_contact).where('id_user', id_user);
        return res.json(data);
    }
    async getContacts (req, res) {

        const data = await knex('contacts').select(['id', 'name', 'email', 'fone', 'id_user']).where('id_user', req.userId);
        return res.json(data);
    }

    async createContact (req, res) {

        const { email, name, fone } = req.body;
        const id_user = req.userId;
        
        const isEmailUsed = await knex('contacts').select('email').where('email', email).first();
        const isFoneUsed = await knex('contacts').select('fone').where('fone', fone).first();

        if (typeof isEmailUsed === 'undefined' && typeof isFoneUsed === 'undefined') {
            try {
                await knex('contacts').insert({email, name, fone, id_user});
                return res.sendStatus(200);
            }
            catch (e) {
                return res.sendStatus(500);
            }
        } else {
            return res.status(422).send({ email: isEmailUsed && isEmailUsed.email, fone: isFoneUsed && isFoneUsed.fone });
        }
    
        
    }

    async deleteContact (req, res) {

        const id_contact = req.params.id;
        const id_user = req.userId;

        const isRegistred = await knex('contacts').where('id', id_contact).where('id_user', id_user).del();

        if (isRegistred) {
            return res.sendStatus(200);
        } else {
            return res.sendStatus(404);
        }
    }
    
    async alterDataContact (req, res) {

        const { id, name, email, fone } = req.body;
        const id_user = req.userId;
        const dataUser = await knex('contacts').select('*').where('id', id).where('id_user', id_user).first();
        
        if (dataUser) {

            if (name && email && fone) {
                dataUser.name = name;
                dataUser.email = email;
                dataUser.fone = fone;
                
                const isEmailUsed = await knex('contacts').select('email').where('email', email).whereNot('id', dataUser.id).first();
                const isFoneUsed = await knex('contacts').select('fone').where('fone', fone).whereNot('id', dataUser.id).first();
                
                if (typeof isEmailUsed === 'undefined' && typeof isFoneUsed === 'undefined') {
                    const isUploaded = await knex('contacts').update(dataUser).where('id', dataUser.id);
    
                    if (isUploaded) {
                        return res.sendStatus(200);
                    } else {
                        return res.sendStatus(500);
                    }
                } else {
                    return res.status(422).send({ email: isEmailUsed && isEmailUsed.email, fone: isFoneUsed && isFoneUsed.fone });
                }
            } else {
                return res.sendStatus(400);
            }
        }
        return res.sendStatus(401);
    }


    
}

module.exports = new ContactController();