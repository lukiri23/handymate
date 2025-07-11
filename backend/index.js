const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db'); 
const userRoutes = require('./routes/userRoutes'); 

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.json({ message: 'HandyMate backend is running!' });
});


app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
