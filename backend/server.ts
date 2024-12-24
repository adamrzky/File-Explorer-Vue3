import { Elysia } from 'elysia';
import folderRoutes from './routes/folderRoutes';
import fileRoutes from './routes/fileRoutes';

const app = new Elysia();

app.on('afterHandle', (ctx) => {
    ctx.set = ctx.set || {};
    ctx.set['Content-Type'] = 'application/json';
});

app.use(folderRoutes);
app.use(fileRoutes);

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000/api/v1');
});
