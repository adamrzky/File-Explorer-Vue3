import { createPool } from 'mysql2/promise';

export const Database = createPool({
  host: 'localhost',
  user: 'root', 
  password: '',  
  database: 'file_explorer_db',  
});
