import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/authRoutes';
import expedienteRoutes from './routes/expedienteRoutes';
import auditRoutes from './routes/auditRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import { renderDashboardPage } from './components/Layout';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/expedientes', expedienteRoutes);
app.use('/auditoria', auditRoutes);
app.use('/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
  res.send(renderDashboardPage());
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});

