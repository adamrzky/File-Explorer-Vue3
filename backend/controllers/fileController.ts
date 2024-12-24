import { Database } from "../models/folderModel";

export const getFilesByFolder = async (folderId: number) => {
  try {
    const [rows] = await Database.query(
      `
      SELECT id, name, file_type, folder_id, created_at, updated_at
      FROM files
      WHERE folder_id = ?
    `,
      [folderId]
    );

    return rows;
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mengambil file dari folder");
  }
};

export const addFile = async (
  name: string,
  fileType: string,
  folderId: number
) => {
  try {
    const [result] = await Database.query(
      `
        INSERT INTO files (name, file_type, folder_id, created_at, updated_at)
        VALUES (?, ?, ?, NOW(), NOW())
      `,
      [name, fileType, folderId]
    );

    return { id: result.insertId, name, fileType, folderId };
  } catch (error) {
    console.error(error);
    throw new Error("Gagal menambahkan file");
  }
};

export const deleteFile = async (fileId: number) => {
  try {
    await Database.query(
      `
        DELETE FROM files
        WHERE id = ?
      `,
      [fileId]
    );

    return { message: "File berhasil dihapus" };
  } catch (error) {
    console.error(error);
    throw new Error("Gagal menghapus file");
  }
};

export const updateFile = async (
  fileId: number,
  name: string,
  fileType: string
) => {
  try {
    await Database.query(
      `
        UPDATE files
        SET name = ?, file_type = ?, updated_at = NOW()
        WHERE id = ?
      `,
      [name, fileType, fileId]
    );

    return { id: fileId, name, fileType };
  } catch (error) {
    console.error(error);
    throw new Error("Gagal memperbarui file");
  }
};
