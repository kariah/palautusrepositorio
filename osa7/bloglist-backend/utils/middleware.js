const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint'
  })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  }

  next(error)
}

//Tehtävä 4.21
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  // console.log('authorization ', authorization)

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }

  next()
}

//Tehtävä 4.22
const userExtractor = async (request, response, next) => { 
  const authorization = request.get('authorization')

  console.log('authorization: ', authorization)

  let token = null
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)
  } else {
    request.user = null
  }

  if (token !== null) {
    let decodedToken = jwt.verify(token, process.env.SECRET)
 
    if (!decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }
    const user = await User.findById(decodedToken.id) 

    request.user = user
  } else {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  } 

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}