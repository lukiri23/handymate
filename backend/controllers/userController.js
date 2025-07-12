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
    res.status(201).json({ id: result.insertId, name, email });
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Prosim, izpolni email in geslo.' });
  }

  const sql = 'SELECT id, name, email, password FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Napaka pri prijavi:', err);
      return res.status(500).json({ message: 'Napaka na strežniku.' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Uporabnik ne obstaja.' });
    }
    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ message: 'Napačno geslo.' });
    }
    res.status(200).json({
      message: 'Prijava uspešna!',
      user: { id: user.id, name: user.name, email: user.email }
    });
  });
};

module.exports = { registerUser, loginUser };
