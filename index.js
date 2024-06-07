const express = require('express');
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 3000;

let movies = [];

// Load movies data from the data.json file
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading data.json:', err);
        return;
    }
    movies = JSON.parse(data);
});


// Endpoint to retrieve all movies
app.get('/api/movies', (req, res) => {
    res.json(movies);
});

// Endpoint to search for a movie by title
app.get('/api/movies/search', (req, res) => {
    const title = req.query.title;
    if (!title) {
        return res.status(400).json({ error: 'Title query parameter is required' });
    }

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(title.toLowerCase())
    );

    res.json(filteredMovies);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
