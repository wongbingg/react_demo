import SQLite from 'react-native-sqlite-storage';
import { Memo } from '../types/memo';

SQLite.enablePromise(true);

type SqliteStorageType = {
  getDatabase: () => Promise<SQLite.SQLiteDatabase>,
  createTable: (tableName: string, columns: { [key: string]: string }) => Promise<[SQLite.ResultSet]>,
  dropTable:   (tableName: string) => Promise<[SQLite.ResultSet]>,
  saveData:    (tableName: string, data: { [key: string]: any }) => Promise<[SQLite.ResultSet]>,
  readData:    (tableName: string, whereClause?: string, whereArgs?: any[]) => Promise<any[]>,
  deleteData:  (tableName: string, whereClause?: string, whereArgs?: any[]) => Promise<[SQLite.ResultSet]>,
}

export const SqliteStorage: SqliteStorageType = {

  // mark; SQLite 데이터베이스 연결
  getDatabase: async () => {
    try {
      const db = await SQLite.openDatabase({
        name: 'TestDB.db',
        location: 'default',
        createFromLocation: '~www/TestDB.db'
      });
      return db;
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Error connecting to database:', error)
      throw error;
    }
  },

  // mark; 테이블 생성 (동적으로 테이블 이름과 컬럼 정의를 받음)
  createTable: async (tableName: string, columns: { [key: string]: string }) => {
    const db = await SqliteStorage.getDatabase();
    const columnDefinitions = Object.entries(columns)
      .map(([name, type]) => `${name} ${type}`)
      .join(', ');
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefinitions});`;
    return await db.executeSql(query, []);
  },

  // mark; 데이터 삽입 또는 업데이트 (동적으로 테이블 이름과 데이터 받음)
  saveData: async (tableName: string, data: { [key: string]: any }) => {
    const db = await SqliteStorage.getDatabase();
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);

    const query = `INSERT OR REPLACE INTO ${tableName} (${columns}) VALUES (${placeholders})`;
    return await db.executeSql(query, values)
  },

  // mark; 데이터 읽기 (동적으로 테이블 이름과 조건 받음)
  readData: async (tableName: string, whereClause?: string, whereArgs: any[] = []) => {
    const db = await SqliteStorage.getDatabase();
    const query = `SELECT * FROM ${tableName} ${whereClause ? `WHERE ${whereClause}` : ''}`;
    const [results] = await db.executeSql(query, whereArgs);

    const rows = [];
    for (let i = 0; i < results.rows.length; i++) {
      rows.push(results.rows.item(i));
    }
    return rows;
  },

  // mark; 데이터 삭제 (동적으로 테이블 이름과 조건 받음)
  deleteData: async (tableName: string, whereClause?: string, whereArgs: any[] = []) => {
    const db = await SqliteStorage.getDatabase();
    const query = `DELETE FROM ${tableName} ${whereClause ? `WHERE ${whereClause}` : ''}`;
    return await db.executeSql(query, whereArgs);
  },

  // mark; 테이블 삭제
  dropTable: async (tableName: string) => {
    const db = await SqliteStorage.getDatabase();
    const query = `DROP TABLE IF EXISTS ${tableName}`;
    return await db.executeSql(query);
  }
}