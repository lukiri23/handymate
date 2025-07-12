const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',        
  user: 'root',             
  password: 'root1234',     
  database: 'handymate'     
});

connection.connect((err) => {
  if (err) {
    console.error('Napaka pri povezavi z bazo:', err);
    process.exit(1);
  }
  console.log('Povezava z lokalno bazo uspešna!');
});

module.exports = connection;
