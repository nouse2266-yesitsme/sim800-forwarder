const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

// Route SIM800L will hit
app.get("/forward", async (req, res) => {
  const { id, lat, lng, speed, battery, timestamp } = req.query;

  if (!id || !lat || !lng || !speed || !battery || !timestamp) {
    return res.status(400).send("Missing parameters");
  }

  try {
    // Forward to your Firebase function
    const response = await axios.get("https://us-central1-vehicle-tracker-dbcb8.cloudfunctions.net/tracker", {
      params: { id, lat, lng, speed, battery, timestamp }
    });

    res.send("Forwarded to Firebase: " + response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error forwarding to Firebase");
  }
});

app.listen(port, () => console.log(`Forwarder running on port ${port}`));