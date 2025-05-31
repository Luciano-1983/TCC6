// Importa o pool de conexões com o banco de dados (gerenciado pelo módulo pg)
const pool = require('../db');

// Define o objeto com os métodos que manipulam dados dos profissionais no banco
const ProfessionalModel = {

    // Cria um novo profissional no banco de dados
    createProfessional: async (nome, telefone, email, cidade, especialidade, registro, senha) => {
        const newProfessional = await pool.query(
            `INSERT INTO profissionais 
            (nome, telefone, email, cidade, especialidade, registro, senha) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [nome, telefone, email, cidade, especialidade, registro, senha] // valores para os parâmetros
        );
        return newProfessional.rows[0]; // retorna o registro recém-criado
    },

    // Busca profissional por email e senha (login)
    findProfessionalByEmailAndPassword: async (email, senha) => {
        const professional = await pool.query(
            'SELECT * FROM profissionais WHERE email = $1 AND senha = $2',
            [email, senha]
        );
        return professional.rows[0]; // retorna o profissional encontrado ou undefined
    },

    // Retorna todos os profissionais cadastrados
    findAll: async () => {
        const { rows } = await pool.query('SELECT * FROM profissionais');
        return rows; // retorna a lista de profissionais
    },

    // Atualiza um profissional existente com base no ID e novos dados
    update: async (id, data) => {
    const { nome, telefone, email, cidade, especialidade, registro, senha } = data;

    const result = await pool.query(
        `UPDATE profissionais SET 
        nome = $1, telefone = $2, email = $3, cidade = $4, 
        especialidade = $5, registro = $6, senha = $7 
        WHERE id = $8 RETURNING *`,
        [nome, telefone, email, cidade, especialidade, registro, senha, id]
    );

    return result.rows[0]; // retorna o profissional atualizado ou undefined
},

    // Exclui um profissional pelo ID
    delete: async (id) => {
        try {
            const result = await pool.query(
                'DELETE FROM profissionais WHERE id = $1 RETURNING *',
                [id]
            );
            return result.rows[0]; // retorna o profissional excluído (se encontrado)
        } catch (error) {
            console.error('Erro ao excluir profissional no modelo:', error);
            throw error; // lança o erro para ser tratado pelo controller
        }
    },
};

// Exporta o modelo para ser utilizado no controller
module.exports = ProfessionalModel;
