// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/data', (req, res) => {
    const { id, lat, lng, speed, battery, timestamp } = req.query;

    if (!id || !lat || !lng) {
        return res.status(400).send('Missing parameters');
    }

    console.log(`ID: ${id}, Lat: ${lat}, Lng: ${lng}, Speed: ${speed}, Battery: ${battery}, Timestamp: ${timestamp}`);
    
    res.send('Data received');
});

app.listen(port, () => console.log(`Server running on port ${port}`));