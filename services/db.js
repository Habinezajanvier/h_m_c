import * as SQLite from 'expo-sqlite';

function openDatabase() {
  const db = SQLite.openDatabase('db.db');
  return db;
}

const db = openDatabase();

db.transaction((tx) => {
  tx.executeSql(
    'create table if not exists hashes (id integer primary key not null, item int, hash text);'
  );
});

export default db;
