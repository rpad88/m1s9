function log(req, res, next) {
    console.log('middleware 👌')
    console.log('Método:', req.method)
    console.log('Path:', req.path)
    console.log('Query Params:', req.params)
    console.log('Body:',req.body)
    next()
}

module.exports = log