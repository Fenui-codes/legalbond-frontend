require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// Your other routes
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


