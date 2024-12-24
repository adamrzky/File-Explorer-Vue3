import { Elysia } from 'elysia';
import folderRoutes from './routes/folderRoutes';
import fileRoutes from './routes/fileroutes';

const app = new Elysia();

// Middleware untuk mengatur header default
app.on('afterHandle', (ctx) => {
  ctx.set = ctx.set || {};
  ctx.set['Content-Type'] = 'application/json';
});

// Hubungkan routes
app.use(folderRoutes);
app.use(fileRoutes);

// Jalankan server
app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
