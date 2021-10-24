const { query } = require('express-validator');
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://mexnumthpguizy:bca97522b1532fb8d0235b2d0bf89e467bdbdae7827af2f297fa5ad963331f38@ec2-23-22-243-103.compute-1.amazonaws.com:5432/d7mvktq0ih71os',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const readSession = async () => {
  try {
    const res = await client.query('SELECT * FROM wa_sessions ORDER BY created_at DESC LIMIT 1');
    if (res.rows.length) return res.rows[0].session;
    return '';
  } catch (err) {
    throw err;
  }
}

const saveSession = (session) => {
  client.query('INSERT INTO wa_sessions (session) VALUES($1)', [session], (err, results) => {
    if (err) {
      console.error('Failed to save session!', err);
    } else {
      console.log('Session saved!');
    }
  });
}

const removeSession = () => {
  client.query('DELETE FROM wa_sessions', (err, results) => {
    if (err) {
      console.error('Failed to remove session!', err);
    } else {
      console.log('Session deleted!');
    }
  });
}

module.exports = {
  readSession,
  saveSession,
  removeSession
}
