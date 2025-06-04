const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chatController');

// Rota para enviar mensagem
router.post('/send', ChatController.send);

// Rota para obter mensagens entre usuário e profissional
router.get('/:userId/:professionalId', ChatController.getMessages);

module.exports = router;
