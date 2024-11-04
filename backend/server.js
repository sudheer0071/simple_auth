const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

dotenv.config();
connectDB();
//edited th file
const app = express();
app.use(
  cors({
    origin: 'https://simple-auth-wivv-frontend.vercel.app',
  })
);

app.use(express.json());

app.options('*', cors());
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
