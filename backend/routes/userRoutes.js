// Importa o módulo Express
const express = require('express');

// Cria um roteador que irá conter as rotas relacionadas ao usuário
const router = express.Router();

// Importa o controller do usuário, que contém a lógica de registro e login
const UserController = require('../controllers/userController');

// Rota para registrar um novo usuário
// Método: POST
// Caminho: /users/register (se estiver montado em /users no app.js)
// Espera: { nome, email, senha }
router.post('/register', UserController.register);

// Rota para login de usuário
// Método: POST
// Caminho: /users/login
// Espera: { email, senha }
router.post('/login', UserController.login);

// Exporta o roteador para ser utilizado no app principal (app.js)
module.exports = router;
