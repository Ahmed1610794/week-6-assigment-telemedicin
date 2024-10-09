const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(session({
    secret: 'telemedicine-secret',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});