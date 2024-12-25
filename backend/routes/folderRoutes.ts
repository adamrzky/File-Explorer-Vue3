import { Elysia } from 'elysia';
import { getFolderStructure } from '../controllers/folderController';
import { getSubFolders } from '../controllers/folderController';


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

app.get('/api/v1/folders/:parentId', async (ctx) => {
    const parentId = ctx.params.parentId;
    try {
        const folders = await getSubFolders(parentId);
        return {
            success: true,
            data: folders,
            message: 'Subfolders fetched successfully',
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            success: false,
            message: 'Error fetching subfolders',
        };
    }
});


export default app;
