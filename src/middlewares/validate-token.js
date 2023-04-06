const jwt = require('jsonwebtoken')

function validateToken(req, res, next) {
    const token = req.headers.authorization
    if (!token || !token.startsWith('Bearer ')) return res.status(403).json({message: 'token ausente'})
    // if (!token || token === 'Bearer' ) return response.status(403).json({message: 'Token não presente'})
     
    const tokenJwt = token.slice(7)
    // jwt.verify(token, chave, callBack function)
    jwt.verify(tokenJwt, process.env.TOKEN_PWD, (error, conteudoDoToken) => {
        if(error) {
            if(error.name === "TokenExpiredError") return res.status(403).json({message: 'Token expirado'})
            if(error.name === "JsonWebTokenError") return res.status(403).json({message: 'Token invalido'})
            // if(error.name === '')
        }
        next()
    })
}

module.exports = validateToken