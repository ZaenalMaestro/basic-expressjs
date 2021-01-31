const express = require('express'),
   app = express()

// membuat fungsi middleware logger
const logger = (req, res, next) => {
   console.log('Logger')
   next()
}

// membuat midleware fungsi menambahkan property waktu pada object req
const requestTime = (req, res, next) => {
   req.time = Date.now()
   next()
}

// middleware untuk route yg spesifik
app.use('/user', (req, res, next) => {
   console.log(`Request type ${req.method}`)
   next()
})

// menggunakan midlware secara global
// app.use(logger, requestTime)

// route
// route sub stack ( lebih dari satu midleware )
app.get('/user/:id', function (req, res, next) {
   console.log('ID:', req.params.id)
   
   // jika id = 0 lanjutkan route selanjutnya
   if(req.params.id === '0') next('route')
   else next()
}, function (req, res, next) {
   res.send('User Info')
})

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
   res.send('next route')
})

// route biasa
app.get('/user', function (req, res) {
   res.send('User Page')
})



function logOriginalUrl(req, res, next) {
   console.log('Request URL:', req.originalUrl)
   next()
}

function logMethod(req, res, next) {
   console.log('Request Type:', req.method)
   next()
}

var logStuff = [logOriginalUrl, logMethod]
app.get('/users/:id', logStuff, function (req, res, next) {
   res.send('User Info')
})

app.listen(3000)