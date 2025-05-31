// Importa o framework Express
const express = require('express');

// Importa o CORS (para permitir requisições de origens diferentes, como frontend separado)
const cors = require('cors');

// Importa o body-parser para interpretar o corpo das requisições como JSON
const bodyParser = require('body-parser');

// Importa os arquivos de rotas
const userRoutes = require('./routes/userRoutes');
const professionalRoutes = require('./routes/professionalRoutes');

// Importa o módulo path, usado para trabalhar com caminhos de arquivos e diretórios
const path = require('path');

// Cria a instância da aplicação Express
const app = express();

// Define a porta do servidor, usando a variável de ambiente se disponível, ou 5000 por padrão
const PORT = process.env.PORT || 5000;

// Habilita o uso de CORS
app.use(cors());

// Habilita o uso de JSON no body das requisições
app.use(bodyParser.json());

// Middleware para servir arquivos estáticos do diretório do frontend
// Útil para quando você quiser entregar um frontend simples via Express (como HTML, JS, CSS)
app.use(express.static(path.join(__dirname, '../frontend')));

// Rota raiz, apenas para teste ou mensagem de boas-vindas
app.get('/', (req, res) => {
    res.send('Bem-vindo ao Sistema de Cuidadores API!');
});

// Define os prefixos das rotas da API
app.use('/api/users', userRoutes);               // Ex: /api/users/register, /api/users/login
app.use('/api/professionals', professionalRoutes); // Ex: /api/professionals/login

// Inicializa o servidor e escuta na porta especificada
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
