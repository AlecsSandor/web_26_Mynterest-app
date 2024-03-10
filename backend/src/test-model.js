// TensorFlow.js for Node,js
const tf = require('@tensorflow/tfjs-node')
const sharp = require('sharp')

// mapping of Fashion-MNIST labels
const labels = [
  'T-shirt/top',
  'Trouser',
  'Pullover',
  'Dress',
  'Coat',
  'Sandal',
  'Shirt',
  'Sneaker',
  'Bag',
  'Ankle boot',
]

const imageWidth = 28
const imageHeight = 28
const imageChannels = 1

const Jimp = require('jimp')
const { resolve } = require('path')

// Convert image to array of normalized pixel values
const toPixelData = async function (imgPath) {
  const pixeldata = []
  const image = await Jimp.read(imgPath)
  await image
    .resize(imageWidth, imageHeight)
    .greyscale()
    .invert()
    .scan(0, 0, imageWidth, imageHeight, (x, y, idx) => {
      let v = image.bitmap.data[idx + 0]
      pixeldata.push(v / 255)
    })

  return pixeldata
}

const runPrediction = function (model, imagepath) {
  return toPixelData(imagepath).then((pixeldata) => {
    const imageTensor = tf.tensor(pixeldata, [
      imageWidth,
      imageHeight,
      imageChannels,
    ])
    const inputTensor = imageTensor.expandDims()
    const prediction = model.predict(inputTensor)
    const scores = prediction.arraySync()[0]

    const maxScore = prediction.max().arraySync()
    const maxScoreIndex = scores.indexOf(maxScore)

    const labelScores = {}

    scores.forEach((s, i) => {
      labelScores[labels[i]] = parseFloat(s.toFixed(4))
    })

    return {
      prediction: `${labels[maxScoreIndex]} (${parseInt(maxScore * 100)}%)`,
      scores: labelScores,
    }
  })
}

// run
const run = async function () {
  if (process.argv.length < 3) {
    console.log('please pass an image to process. ex:')
    console.log('  node test-model.js /path/to/image.jpg')
  } else {
    // e.g., /path/to/image.jpg
    const imgPath = process.argv[2]

    const modelUrl = 'file://./src/fashion-mnist-tfjs/model.json'
    //const modelUrl = 'file://./fashion-mnist-tfjs-transfer/model.json';

    console.log('Loading model...')
    const model = await tf.loadLayersModel(modelUrl)
    model.summary()

    console.log('Running prediction...')
    const prediction = await runPrediction(model, imgPath)
    //console.log(prediction)
  }
}

//run();

async function loadImage(url) {
  try {
    // Fetch the image from the URL
    const response = await fetch(url)

    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error(`Failed to fetch image. Status: ${response.status}`)
    }

    // Read the response body as a Buffer
    const imageDataBuffer = Buffer.from(await response.arrayBuffer())

    // Resize the image to a max width of 564px
    const resizedImageDataBuffer = await sharp(imageDataBuffer)
      .resize({ width: 564 })
      .toBuffer()

    // Now you can use the resizedImageBuffer as needed
    console.log('Image loaded and processed successfully.')
    return resizedImageDataBuffer
  } catch (error) {
    console.error('Error:', error.message)
    return Promise.reject(error)
  }
}

const processPredictions = async (prediction) => {
  return new Promise((resolve, reject) => {
    try {
      // Extract entries from the scores object and sort them by value in descending order
      const sortedEntries = Object.entries(prediction.scores).sort(
        ([, a], [, b]) => b - a
      )
      // Extract the keys of the first three entries
      const topThreeKeys = sortedEntries.slice(0, 3).map(([key]) => key)

      console.log(topThreeKeys)
      resolve(topThreeKeys)
    } catch (error) {
      console.error('Error processing predictions:', error.message)
      reject(error)
    }
  })
}

const runOnDemand = function (url, description, title, owner) {
  return new Promise((resolve, reject) => {
    try {
      loadImage(url).then(async (imgPath) => {
        const modelUrl = 'file://./src/fashion-mnist-tfjs-increasedBatch/model.json'
        //const modelUrl = 'file://./src/fashion-mnist-tfjs/model.json'
        //const modelUrl = 'file://./fashion-mnist-tfjs-transfer/model.json';

        console.log('Loading model...')
        const model = await tf.loadLayersModel(modelUrl)
        model.summary()

        console.log('Running prediction...')
        const prediction = await runPrediction(model, imgPath)
        //console.log(prediction)
        const processedPrediction = await processPredictions(prediction)
        const serializedImage = await toPixelData(imgPath)
        const dimensions = await sharp(imgPath)
          .metadata()
          .then((metadata) => {
            return([metadata.width, metadata.height])
            
          })
          .catch((error) => {
            console.error('Error reading image metadata:', error)
          })
        const combinedObject = {
          item_01: processedPrediction[0],
          item_02: processedPrediction[1],
          item_03: processedPrediction[2],
          url: url,
          description: description,
          title: title,
          owner: owner
          // width: dimensions[0],
          // height: dimensions[1],
          // image: serializedImage,
        }
        resolve(combinedObject)
      })
    } catch (error) {
      reject(error)
    }
  })
}

//runOnDemand("https://i.pinimg.com/564x/97/ff/61/97ff618fc228dec31d2637b1d3480001.jpg")

module.exports = {
  runOnDemand,
}
