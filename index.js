const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json({ useUnifiedTopology: true }));
app.use(cors());

const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;
const DB_URL = process.env.USER; //|| "mongodb://127.0.0.1:27017";

app.post("/url", async (req, res) => {
  try {
    const client = await mongoClient.connect(DB_URL);
    const db = client.db("url");
    const data = {
      urlLong: req.body.url,
    };
    await db.collection("urlLong").insertOne(data);
    res.status(200).json({ message: "sent successfully" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  } finally {
    client.close();
  }
});

app.get("/surl", async (req, res) => {
  try {
    const client = await mongoClient.connect(DB_URL);
    const db = client.db("url");
    const result = await db.collection("urlLong").find();
    if (result) {
      res.status(200).json({ message: "url received" });
    } else {
      res.status(400).json({ message: "url not received" });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  } finally {
    client.close();
  }
});

app.listen(port, () => console.log(`Server listening on ${port}`));
