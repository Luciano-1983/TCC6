// Importa o Pool do pacote 'pg' (biblioteca oficial do PostgreSQL para Node.js)
const { Pool } = require('pg');

// Cria uma instância de pool de conexões com as configurações do seu banco de dados
const pool = new Pool({
    user: 'postgres',       // Nome do usuário do banco
    host: 'localhost',      // Host do banco (geralmente localhost em desenvolvimento)
    database: 'caregiver_db',       // Nome do banco de dados
    password: 'nova_senha', // Senha do usuário do banco
    port: 5432,             // Porta padrão do PostgreSQL
});

// Exporta o pool para ser utilizado em outros arquivos (como models)
module.exports = pool;
