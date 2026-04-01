import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares Globais
app.use(cors()); // Importante para permitir que o front-end acesse a API
app.use(express.json()); // Permite ler o corpo das requisições em JSON

// Rota inicial de Health Check
app.get('/', (req, res) => {
  res.json({
    message: 'API Captain Barbearia está rodando com sucesso! 🚀',
    version: '1.0.0'
  });
});

// Importando Rotas da Barbearia
import { appointmentsRouter } from './routes/appointments.routes';

// =======================
// ROTAS DA APLICAÇÃO
// =======================
app.use('/api/appointments', appointmentsRouter);


const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`[SERVER] Servidor back-end Express rodando em http://localhost:${PORT}`);
});
