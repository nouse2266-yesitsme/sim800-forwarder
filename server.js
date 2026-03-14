const express = require('express');
const admin = require('firebase-admin');

const app = express();
const port = process.env.PORT || 3000;

// Load Firebase credentials from environment variable
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.get('/data', async (req, res) => {
  const { id, lat, lng, speed, battery, timestamp } = req.query;

  if (!id || !lat || !lng) {
    return res.status(400).send('Missing parameters');
  }

  try {
    // Store data under vehicles/{id}/locations/{auto-generated doc}
    await db.collection('vehicles')
            .doc(id)
            .collection('locations')
            .add({
              lat: parseFloat(lat),
              lng: parseFloat(lng),
              speed: parseFloat(speed),
              battery: parseFloat(battery),
              timestamp: Number(timestamp)
            });

    console.log(`Data stored for ${id}`);
    res.send('Data stored');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error storing data');
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));