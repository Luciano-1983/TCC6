const express = require('express');
const http = require('http');
const socketIo = require('socket.io'); // Importando o socket.io
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const professionalRoutes = require('./routes/professionalRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Inicializando o Socket.IO

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/professionals', professionalRoutes);

// Conexão Socket.IO
let users = {};  // Armazenando os usuários conectados com seus respectivos sockets

io.on('connection', (socket) => {
  console.log('Usuário conectado: ' + socket.id);

  // Recebe o ID do usuário ou profissional ao conectar, para associar o socket
  socket.on('login', (userData) => {
    const { userId, type } = userData;
    users[socket.id] = { userId, type }; // Armazena o usuário ou profissional pelo ID do socket
    console.log(`${type} com ID ${userId} conectado.`);
  });

  // Envio de mensagens
  socket.on('send_message', (data) => {
    const { fromUserId, toProfessionalId, message } = data;

    // Identificando o socket do profissional para enviar a mensagem
    for (const [socketId, user] of Object.entries(users)) {
      if (user.userId === toProfessionalId && user.type === 'professional') {
        io.to(socketId).emit('receive_message', { fromUserId, message });
        break;
      }
    }
  });

  // Desconexão do socket
  socket.on('disconnect', () => {
    console.log('Usuário desconectado: ' + socket.id);
    delete users[socket.id]; // Remove o usuário ou profissional da lista ao desconectar
  });
});

// Inicializa o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
