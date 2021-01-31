const express = require('express')
const app = express()

// buat middleware
const catatPenontonMasuk = function (req, res, next) {
   console.log('Ada penonton yang masuk stadion...')
   next()
}

// menggunakan middleware
app.use(catatPenontonMasuk)

// route
app.get('/penonton', function (req, res) {
   res.send('Selamat datang distadion Gelora Bung karno')
})

// server berjalan diport 3000
app.listen(3000)
console.log('server berjalan diport http://localhost:3000')