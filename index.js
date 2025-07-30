const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u8prwai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create, a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const activeGargenrsCollection = client.db("activeGardenrDB").collection("activeGargenrs")
    const ShareGardenTipColloction = client.db("ShareGardenTipDB").collection("ShareGardenTip")
    

    app.get('/activeGargenrs', async (req, res) => {
  const show = req.query.show; // e.g. /activeGargenrs?show=all
   if (show === "all") {
    const result = await activeGargenrsCollection.find().toArray();
    res.send(result);
   } else {
    const query = { status: "Active" };
    const result = await activeGargenrsCollection.find(query).limit(6).toArray();
    res.send(result);
   }
 });




app.get('/activeGargenrs', async (req, res) => {
  const query = { status: "Active" }; // Capital A
  const result = await activeGargenrsCollection.find(query).limit(6).toArray();
  res.send(result);
});


app.get('/ShareGardenTipHome', async(req,res) => {
  const result = await ShareGardenTipColloction.find().limit(6).toArray();
  res.send(result);
});






app.get('/ShareGardenTip', async(req,res) => {
  const result = await ShareGardenTipColloction.find().toArray()
  res.send(result)
})



    app.post('/activeGargenrs', async(req,res) => {
      const newGardener = req.body;
      const result = await activeGargenrsCollection.insertOne(newGardener)
      res.send(result)
    })

     app.post('/ShareGardenTip', async(req,res) => {
      const newShareGardenTip = req.body;
      const result = await ShareGardenTipColloction.insertOne(newShareGardenTip)
      res.send(result)
     })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Welcome to Prestice Project!')
})


app.listen(port, () => {
  console.log(`Welcome to Prestice Project! on port ${port}`)
})