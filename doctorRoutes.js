const express = require('express');
const router = express.Router();
const db = require('../db');

// إضافة طبيب
router.post('/add', (req, res) => {
    const { first_name, last_name, specialization, email, phone } = req.body;
    const query = 'INSERT INTO doctors (first_name, last_name, specialization, email, phone) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [first_name, last_name, specialization, email, phone], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Doctor added successfully');
    });
});

// عرض الأطباء
router.get('/list', (req, res) => {
    const query = 'SELECT * FROM doctors';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

module.exports = router;