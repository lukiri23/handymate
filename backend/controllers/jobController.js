const db = require('../config/db');

const createJob = (req, res) => {
  const { user_id, title, description } = req.body;
  if (!user_id || !title || !description) {
    return res.status(400).json({ message: 'Vsa polja so obvezna.' });
  }
  const sql = 'INSERT INTO jobs (user_id, title, description) VALUES (?, ?, ?)';
  db.query(sql, [user_id, title, description], (err, result) => {
    if (err) {
      console.error('Napaka pri ustvarjanju:', err);
      return res.status(500).json({ message: 'Napaka na strežniku.' });
    }
    res.status(201).json({ id: result.insertId, user_id, title, description, status: 'open' });
  });
};

const getJobs = (req, res) => {
  db.query('SELECT * FROM jobs', (err, results) => {
    if (err) {
      console.error('Napaka pri pridobivanju:', err);
      return res.status(500).json({ message: 'Napaka na strežniku.' });
    }
    res.status(200).json(results);
  });
};

const getJobById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM jobs WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Napaka na strežniku.' });
    if (results.length === 0) return res.status(404).json({ message: 'Težava ni najdena.' });
    res.status(200).json(results[0]);
  });
};

const updateJob = (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const sql = 'UPDATE jobs SET title = ?, description = ?, status = ? WHERE id = ?';
  db.query(sql, [title, description, status, id], (err) => {
    if (err) return res.status(500).json({ message: 'Napaka na strežniku.' });
    res.status(200).json({ message: 'Posodobljeno!' });
  });
};

const deleteJob = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM jobs WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ message: 'Napaka na strežniku.' });
    res.status(200).json({ message: 'Izbrisano!' });
  });
};

module.exports = { createJob, getJobs, getJobById, updateJob, deleteJob };
