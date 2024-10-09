const express = require('express');
const router = express.Router();
const db = require('../db');

// حجز موعد
router.post('/book', (req, res) => {
    const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;
    const query = 'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?)';
    db.query(query, [patient_id, doctor_id, appointment_date, appointment_time], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Appointment booked successfully');
    });
});

// عرض المواعيد
router.get('/list', (req, res) => {
    const query = 'SELECT * FROM appointments';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

module.exports = router;