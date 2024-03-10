const http = require('http')
const runModel = require('./test-model.js')
const url = require('url')
const Database = require('./databaseManager')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const database = new Database()

const server = http.createServer(async (req, res) => {
  // Allow requests from http://localhost:3000
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  // Allow these methods from the client
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  // Allow these headers to be sent by the client
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  await database.connect()

  if (req.method === 'GET') {
    // Handle GET requests
    const parsedUrl = url.parse(req.url, true)
    const queryParams = parsedUrl.query
    const param1 = queryParams.q
    try {
      let query = {}
      if (param1 != '' && param1 != undefined)
        query = {
          $or: [{ item_01: param1 }, { item_02: param1 }, { item_03: param1 }],
        }
      //console.log(param1)
      const result = await database.findDocuments('Images', query)
      //console.log('Found documents:',result)
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end(JSON.stringify(result))
    } catch (error) {
      console.error(error)
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      res.end('Internal Server Error')
    }
  } else if (req.method === 'POST') {
    let data = ''
    req.on('data', (chunk) => {
      // Collect the data as it comes in
      data += chunk
    })

    const route = url.parse(req.url).pathname // Parse the route path

    if (route == '/') {
      req.on('end', async () => {
        try {
          console.log('Porcessing data')
          const item = await runModel.runOnDemand(data)
          const insertedId = await database.insertDocument('Images', item)
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ insertedId }))
        } catch (error) {
          console.error(error)
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.end('Internal Server Error')
        }
      })
    } else if (route == '/create') {
      req.on('end', async () => {
        const payload = JSON.parse(data)
        try {
          console.log('Porcessing data')
          const item = await runModel.runOnDemand(
            payload.link,
            payload.description,
            payload.title,
            payload.owner
          )
          const insertedId = await database.insertDocument('Images', item)
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ insertedId }))
        } catch (error) {
          console.error(error)
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.end('Internal Server Error')
        }
      })
    } else if (route == '/save') {
      req.on('end', async () => {
        const payload = JSON.parse(data)
        try {
          const insertedId = await database.insertDocument('Users', payload)
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ insertedId }))
        } catch (error) {
          console.error(error)
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.end('Internal Server Error')
        }
      })
    } else if (route == '/getsaved') {
      req.on('end', async () => {
        const payload = JSON.parse(data)
        try {
          console.log('has requested' + payload.userID)
          const savedPins = await database.findDocuments('Users', {
            userID: payload.userID,
          })
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ savedPins }))
          //console.log(savedPins)
        } catch (error) {
          console.error(error)
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.end('Internal Server Error')
        }
      })
    } else if (route == '/deletePin') {
      req.on('end', async () => {
        const payload = JSON.parse(data)
        try {
          console.log('blabla')
          const deletedId = await database.deleteSavedPin('Users', payload)
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ deletedId }))
        } catch (error) {
          console.error(error)
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.end('Internal Server Error')
        }
      })
    } else if (route == '/getMyImages') {
      req.on('end', async () => {
        const payload = JSON.parse(data)
        const queryArray = []
        try {
          for (var key in payload.data) {
            queryArray.push(new mongoose.Types.ObjectId(payload.data[key]._id))
          }
          const savedPins = await database.findDocuments('Images', {
            _id: { $in: queryArray },
          })
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ savedPins }))
        } catch (error) {}
        // } catch (error) {
        //   console.error(error)
        //   res.writeHead(500, { 'Content-Type': 'text/plain' })
        //   res.end('Internal Server Error')
        // }
      })
    } else if (route == '/getCreatedPins') {
      req.on('end', async () => {
        const payload = JSON.parse(data)
        try {
          console.log('has requested' + payload.userID)
          const savedPins = await database.findDocuments('Images', {
            owner: payload.owner,
          })
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ savedPins }))
          //console.log(savedPins)
        } catch (error) {
          console.error(error)
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.end('Internal Server Error')
        }
      })
    } 
  } else {
    // Handle other HTTP methods or routes
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not Found')
  }
})

const PORT = 8080

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
