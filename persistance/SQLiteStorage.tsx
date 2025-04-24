import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

// todo; SQLite 데이터베이스 연결
export const getDatabase = async () => {
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
};

// todo; Create SQLite Table (If exists, no create)
export const createSqlTable = async () => {
  const db = await getDatabase()
    .then(res => {
      console.log('성공', res);
      return res;
    })
    .catch(err => console.error(err));

  if (db) await createTable(db);
};

// todo; 삽입 / 대체 
export const saveTable = async (tableName: string, data: any) => {
  const db = await getDatabase();
  const query = `INSERT OR REPLACE INTO ${tableName}(text) VALUES(?)`;

  return await db.executeSql(query, [data.text]);
};

// todo; 읽기 
export const readTable = async (tableName: string) => {
  const db = await getDatabase();
  const query = `SELECT * FROM ${tableName}`;

  return await db.executeSql(query, []);
}

// todo; 삭제
export const deleteTable = async (tableName: string) => {
  const db = await getDatabase();
  const query = `DELETE from ${tableName}`;
  return await db.executeSql(query);
}

const createTable = async (db: SQLite.SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS test (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, -- id는 자동 증가, NOT NULL, PRIMARY KEY
        text TEXT NOT NULL                             -- text는 NOT NULL
      );`;

  return await db.executeSql(query, []);
};

// todo; 데이터 가져오기 함수
export const fetchMemos = async () => {
  try {
    const db = await getDatabase();
    const fetchedMemos: { id: string; text: string }[] = [];
    const [queryResults] = await readTable('test')
    const rows = queryResults.rows;
    for (let i = 0; i < rows.length; i++) {
      fetchedMemos.push(rows.item(i));
    }
    return fetchedMemos;
  } catch (error) {
    console.log('Error fetching memos:', error);
  }
};

// todo; 특정 id 로 메모 데이터를 불러오기
export const fetchMemoById = async (id: string) => {
  try {
    const db = await getDatabase();
    const query = `SELECT text FROM test WHERE id = ?`;
    const [queryResults] = await db.executeSql(query, [id]);

    if (queryResults.rows.length > 0) {
      return queryResults.rows.item(0).text; // id에 해당하는 text 반환
    } else {
      return null; // id에 해당하는 데이터가 없을 경우 null 반환
    }
  } catch (error) {
    console.error('Error fetching memo by id:', error);
    throw error;
  }
};

// todo; 특정 id로 메모 데이터를 제거 
export const deleteMemoById = async (id: string) => {
  try {
    const db = await getDatabase();
    const query = `DELETE FROM test WHERE id = ?`; // 특정 id 기준으로 삭제
    await db.executeSql(query, [id]);
    console.log(`Memo with id ${id} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting memo by id:', error);
    throw error;
  }
};