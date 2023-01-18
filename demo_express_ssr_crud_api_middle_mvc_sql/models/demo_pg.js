const { Pool } = require('pg')
const pool = new Pool({
  host: 'localhost',
  user: 'alex',
  database: 'postgres',
  password: 1234
})


pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  })
})