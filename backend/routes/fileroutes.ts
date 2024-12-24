import { Elysia } from 'elysia';
import { getFilesByFolder, addFile, deleteFile, updateFile } from '../controllers/fileController';

const app = new Elysia();

app.get('/api/v1/files', async (ctx) => {
  try {
    const folderId = parseInt(ctx.query.folder_id);
    if (!folderId) {
      ctx.status = 400;
      return {
        success: false,
        message: 'folder_id harus disertakan',
      };
    }

    const files = await getFilesByFolder(folderId);
    return {
      success: true,
      data: files,
      message: 'Files fetched successfully',
    };
  } catch (error) {
    console.error('Error:', error);
    ctx.status = 500;
    return {
      success: false,
      message: 'Gagal mengambil file dari folder',
    };
  }
});

app.post('/api/v1/files', async (ctx) => {
  try {
    const { name, file_type, folder_id } = ctx.body;
    if (!name || !file_type || !folder_id) {
      ctx.status = 400;
      return {
        success: false,
        message: 'name, file_type, dan folder_id harus disertakan',
      };
    }

    const file = await addFile(name, file_type, parseInt(folder_id));
    ctx.status = 201; 
    return {
      success: true,
      data: file,
      message: 'File added successfully',
    };
  } catch (error) {
    console.error('Error:', error);
    ctx.status = 500;
    return {
      success: false,
      message: 'Gagal menambahkan file',
    };
  }
});

app.delete('/api/v1/files/:id', async (ctx) => {
  try {
    const fileId = parseInt(ctx.params.id);
    if (!fileId) {
      ctx.status = 400;
      return {
        success: false,
        message: 'file_id harus disertakan',
      };
    }

    const result = await deleteFile(fileId);
    return {
      success: true,
      data: result,
      message: 'File deleted successfully',
    };
  } catch (error) {
    console.error('Error:', error);
    ctx.status = 500;
    return {
      success: false,
      message: 'Gagal menghapus file',
    };
  }
});

app.put('/api/v1/files/:id', async (ctx) => {
  try {
    const fileId = parseInt(ctx.params.id);
    const { name, file_type } = ctx.body;
    if (!name || !file_type) {
      ctx.status = 400;
      return {
        success: false,
        message: 'name dan file_type harus disertakan',
      };
    }

    const file = await updateFile(fileId, name, file_type);
    return {
      success: true,
      data: file,
      message: 'File updated successfully',
    };
  } catch (error) {
    console.error('Error:', error);
    ctx.status = 500;
    return {
      success: false,
      message: 'Gagal memperbarui file',
    };
  }
});

export default app;
