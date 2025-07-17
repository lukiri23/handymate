const db = require('../config/db')

const createJob = (req, res) => {
  const { user_id, title, description } = req.body
  if (!user_id || !title || !description) {
    return res.status(400).json({ message: 'Izpolni vsa polja.' })
  }
  const sql = 'INSERT INTO jobs (user_id, title, description) VALUES (?, ?, ?)'
  db.query(sql, [user_id, title, description], (err, result) => {
    if (err) {
      console.error('Napaka pri ustvarjanju težave:', err)
      return res.status(500).json({ message: 'Napaka na strežniku.' })
    }
    res.status(201).json({ id: result.insertId, user_id, title, description })
  })
}

module.exports = { createJob  }
