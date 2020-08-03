const express = require('express');
const connectDB = require('./config/db');
const corse = require('cors');
const app = express();

connectDB();
app.use(corse());
// Parse incoming request bodies
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/notes', require('./routes/api/notes'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
