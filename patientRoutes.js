const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

// تسجيل المريض
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO patients (first_name, last_name, email, password_hash, phone) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [first_name, last_name, email, hashedPassword, phone], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Patient registered successfully');
    });
});

// تسجيل الدخول
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM patients WHERE email = ?';

    db.query(query, [email], async (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(400).send('Invalid email or password');

        const validPassword = await bcrypt.compare(password, result[0].password_hash);
        if (!validPassword) return res.status(400).send('Invalid email or password');

        req.session.patientId = result[0].id;
        res.send('Login successful');
    });
});

module.exports = router;