import { Database } from '../models/folderModel';

export const getFolderStructure = async () => {
  try {
    const [rows] = await Database.query(`
      WITH RECURSIVE folder_tree AS (
        SELECT id, name, parent_id
        FROM folders
        WHERE parent_id IS NULL
        UNION ALL
        SELECT f.id, f.name, f.parent_id
        FROM folders f
        INNER JOIN folder_tree ft ON ft.id = f.parent_id
      )
      SELECT * FROM folder_tree;
    `);

    // console.log("Data folder yang diambil:", rows); // Menambahkan log untuk memeriksa data
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error('Gagal mengambil struktur folder');
  }
};


export const getSubFolders = async (parent_id) => {
  try {
    const query = `
      SELECT id, name, parent_id
      FROM folders
      WHERE parent_id = ?
    `;
    const [rows] = await Database.query(query, [parent_id]);

    if (!rows) {
      throw new Error('Subfolders not found');
    }

    return rows;
  } catch (error) {
    console.error('Error fetching subfolders:', error);
    throw new Error('Failed to fetch subfolders');
  }
};