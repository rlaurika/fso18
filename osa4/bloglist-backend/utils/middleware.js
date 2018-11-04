const tokenExtractor = (request, response, next) => {
  const auth = request.get('Authorization')

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request.token = auth.substring(7)
  } else {
    request.token = null
  }
  next()
}

module.exports = { tokenExtractor }