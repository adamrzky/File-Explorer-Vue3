import { Elysia } from 'elysia';
import { getFilesByFolder, addFile, deleteFile, updateFile } from '../controllers/fileController';

const app = new Elysia();

app.get('/api/files', async (ctx) => {
  try {
    const folderId = parseInt(ctx.query.folder_id);
    if (!folderId) {
      ctx.status = 400;
      return { message: 'folder_id harus disertakan' };
    }

    const files = await getFilesByFolder(folderId);
    return files;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    return { message: 'Gagal mengambil file dari folder' };
  }
});

app.post('/api/files', async (ctx) => {
  try {
    const { name, file_type, folder_id } = ctx.body;
    if (!name || !file_type || !folder_id) {
      ctx.status = 400;
      return { message: 'name, file_type, dan folder_id harus disertakan' };
    }

    const file = await addFile(name, file_type, parseInt(folder_id));
    ctx.status = 201;
    return file;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    return { message: 'Gagal menambahkan file' };
  }
});

app.delete('/api/files/:id', async (ctx) => {
  try {
    const fileId = parseInt(ctx.params.id);
    if (!fileId) {
      ctx.status = 400;
      return { message: 'file_id harus disertakan' };
    }

    const result = await deleteFile(fileId);
    return result;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    return { message: 'Gagal menghapus file' };
  }
});

app.put('/api/files/:id', async (ctx) => {
  try {
    const fileId = parseInt(ctx.params.id);
    const { name, file_type } = ctx.body;
    if (!name || !file_type) {
      ctx.status = 400;
      return { message: 'name dan file_type harus disertakan' };
    }

    const file = await updateFile(fileId, name, file_type);
    return file;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    return { message: 'Gagal memperbarui file' };
  }
});

export default app;
