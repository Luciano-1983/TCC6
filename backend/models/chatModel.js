import { query } from '../db';

const ChatModel = {
    // Enviar mensagem
    sendMessage: async (fromUserId, toProfessionalId, message) => {
        const result = await query(
            'INSERT INTO mensagens (from_user_id, to_professional_id, message, timestamp) VALUES ($1, $2, $3, NOW()) RETURNING *',
            [fromUserId, toProfessionalId, message]
        );
        return result.rows[0];
    },

    // Recuperar mensagens entre usuário e profissional
    getMessages: async (userId, professionalId) => {
        const result = await query(
            'SELECT * FROM mensagens WHERE (from_user_id = $1 AND to_professional_id = $2) OR (from_user_id = $2 AND to_professional_id = $1) ORDER BY timestamp',
            [userId, professionalId]
        );
        return result.rows;
    }
};

export default ChatModel;
