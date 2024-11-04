const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: [
      'https://simple-auth-wivv-frontend-qgo9mov7v-prajjawal12s-projects.vercel.app/',
    ],
    methods: ['POST', 'GET'],
    credentials: true,
  })
);
app.use(express.json());

app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
