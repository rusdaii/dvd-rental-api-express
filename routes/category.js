const express = require('express')
const router = express.Router()
const pool = require('../config/config')

router.get('/', function (req, res) {
    const query = `SELECT category.* FROM category`
    pool.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows);
    });
});

router.get('/:categoryId', function (req, res) {
    const categoryId = req.params.categoryId;
    const query = `
        SELECT film.*
        FROM film
        JOIN film_category ON film.film_id = film_category.film_id
        WHERE film_category.category_id = $1`
    pool.query(query, [categoryId], (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.rows.length === 0) {
                return res.status(404).send('No movie found for this category');
            } else {
                res.status(200).json(result.rows);
            }
        }
    });
});

module.exports = router;