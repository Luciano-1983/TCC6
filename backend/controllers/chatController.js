const ChatModel = require('../models/chatModel').default;

const ChatController = {
    send: async (req, res) => {
        const { fromUserId, toProfessionalId, message } = req.body;
        try {
            const newMessage = await ChatModel.sendMessage(fromUserId, toProfessionalId, message);
            res.json(newMessage);
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            res.status(500).send('Erro ao enviar mensagem');
        }
    },

    getMessages: async (req, res) => {
        const { userId, professionalId } = req.params;
        try {
            const messages = await ChatModel.getMessages(userId, professionalId);
            res.json(messages);
        } catch (error) {
            console.error('Erro ao carregar mensagens:', error);
            res.status(500).send('Erro ao carregar mensagens');
        }
    }
};

module.exports = ChatController;
