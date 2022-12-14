const { MongoClient, ObjectId } = require('mongodb')
const client = new MongoClient('mongodb://127.0.0.1:27017')

const express = require('express')
const app = express()
const port = 3000

// Welcome Routes
app.get('/', async (req, res) => {
  res.send("Welcome to landing page")
})

// RESTful APIs
// GET, POST, PUT, DELETE

// API get all users
app.get('/users', async (req, res) => {
  try {
    await client.connect()
    const users = await client.db("SPA").collection("spa").find({}).toArray() 
    res.json(users)
  } finally {
    await client.close()
  }
})

// API get user by id
app.get('/users/:id', async (req, res) => {
  try {
    id = req.params.id
    await client.connect()
    const user = await client.db("SPA").collection("spa").findOne({"_id": new ObjectId(id)}) 
    res.json(user)
  } finally {
    await client.close()
  }
})


// API delete new user
app.delete('/users/:id', async (req, res) => {
  try {
    id = req.params.id
    await client.connect()
    await client.db("SPA").collection("spa").deleteOne({"_id": new ObjectId(id)}) 
    res.json({})
  } finally {
    await client.close()
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

