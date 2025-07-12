const db = require('../config/db');


const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Prosim, izpolni vsa polja.' });
  }

  
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error('Napaka pri registraciji:', err);
      return res.status(500).json({ message: 'Napaka na strežniku.' });
    }
    res.status(201).json({ message: 'Uporabnik uspešno registriran!' });
  });
};

module.exports = { registerUser };
