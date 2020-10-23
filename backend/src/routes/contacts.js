const express = require('express')
const router = express.Router() 

const ContactController = require('../controllers/ContactController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

// Get Contacts Id
router.get('/contact/:id', AuthMiddleware, ContactController.getContactID)

// Get all contacts
router.get('/contact', AuthMiddleware, ContactController.getContacts)

// Create Contact
router.post('/contact', AuthMiddleware, ContactController.createContact)

// Delete contact
router.delete('/contact/:id', AuthMiddleware, ContactController.deleteContact)

// Alter contact
router.put('/contact', AuthMiddleware, ContactController.alterDataContact)

module.exports = router;