const { MongoClient, ObjectId } = require('mongodb')
const client = new MongoClient('mongodb://127.0.0.1:27017')

const http = require('http')
const https = require('https')
const fs = require('fs')

const express = require('express')
const app = express()

const options = {
  key: fs.readFileSync('./security/cert.key', 'utf-8'),
  cert: fs.readFileSync('./security/cert.pem', 'utf-8'),
}

const credentials = {key: options.key, cert: options.cert}

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



const httpServer = http.createServer(app).listen(3000, () => console.log('Start http app on port 3000'))
const httpsServer = https.createServer(app).listen(3001, () => console.log('Start https app on port 3001'))

// app.listen(port, () => {
  // console.log(`Example app listening on port ${port}`)
// })

