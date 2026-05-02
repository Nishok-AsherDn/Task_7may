require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const app= express();
const port= 3000;

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});
app.get('/status', (req,res) => {
    res.json({
        status: "Server is running",
        time: new Date().toString()
    });
});
connectDB();

app.listen(port,() => {
    console.log(`Server is running on ${port}`);
});
