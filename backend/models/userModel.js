// Importa o pool de conexões com o banco de dados (PostgreSQL)
const pool = require('../db');

const UserModel = {
    
    // Cria um novo usuário no banco de dados
    create: async (nome, email, senha) => {
        const newUser = await pool.query(
            `INSERT INTO usuarios (nome, email, senha) 
             VALUES ($1, $2, $3) RETURNING *`,
            [nome, email, senha] // Parâmetros da query (para evitar SQL Injection)
        );
        return newUser.rows[0]; // Retorna o usuário criado
    },

    // Busca um usuário pelo email e senha (para login)
    findUserByEmailAndPassword: async (email, senha) => {
        const user = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1 AND senha = $2',
            [email, senha]
        );
        return user.rows[0]; // Retorna o usuário encontrado ou undefined
    }
};

// Exporta o modelo para ser usado nos controllers
module.exports = UserModel;
