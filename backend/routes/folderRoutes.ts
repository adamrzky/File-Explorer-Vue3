import { Elysia } from 'elysia';
import { getFolderStructure } from '../controllers/folderController';


const app = new Elysia();

app.get('/api/v1/folders', async () => {
    try {
        const folders = await getFolderStructure(); 
        return {
            success: true,
            data: folders,
            message: 'Folders fetched successfully',
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            success: false,
            message: 'Terjadi kesalahan pada server',
        };
    }
});

export default app;
