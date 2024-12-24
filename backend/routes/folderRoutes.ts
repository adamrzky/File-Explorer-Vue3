import { Elysia } from 'elysia';
import { getFolderStructure } from '../controllers/folderController';

const app = new Elysia();

app.get('/api/folders', async () => {
    try {
        const folders = await getFolderStructure(); 
        // console.log('Data folders:', folders); 
        return folders; 
    } catch (error) {
        // console.error('Terjadi error:', error); 
        return { message: 'Terjadi kesalahan pada server' };
    }
});



export default app;
