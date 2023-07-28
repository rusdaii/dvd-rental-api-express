const express = require('express');
const router = express.Router();
const pool = require('../config/config');

router.get('/', function (req, res) {
    const query = `SELECT film.* FROM film`
    pool.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows);
    });
});

router.get('/:movieId', function (req, res) {
    const movieId = req.params.movieId;
    const query = `SELECT film.* FROM film WHERE film_id = $1`
    pool.query(query, [movieId], (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.rows.length === 0) {
                return res.status(404).send('Movie not found');
            } else {
                res.status(200).json(result.rows);
            }
        }
    });
});

module.exports = router;