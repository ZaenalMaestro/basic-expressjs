const express = require('express'),
   app = express()

/* 
=> route method: GET, POST, PUT, PATCH, DELETE, DLL
=> contoh pembuatan route: app.method(route-path, callback)
 */

app.get('/', function (req, res) {
   res.send('GET request to home page')
})

app.post('/', function (req, res) {
   res.send('POST request to home page')
})

app.all('/secret', function (req, res, next) {
   console.log('Access secret section')
   next()
})

/* 
route path : route yang dapat berupa string, pola string,regex (expresi regular) 
app
*/

/* 
jalur route akan cocok dengan:
- baseurl/about
 */
app.get('/about', function (req, res) {
   res.send('about')
})

/* 
jalur route akan cocok dengan:
- baseurl/random.text
 */
app.get('/random.text', function (req, res) {
   res.send('random.text')
})

/* 
jalur route akan cocok dengan:
- baseurl/abcdef
- baseurl/ abdef
 */
app.get('/abc?def', function (req, res) {
   res.send('abc?def')
})

/* 
jalur route akan cocok dengan:
- baseurl/abcd
- baseurl/ abbcd
- baseurl/ abbcd
- and so on (dan seterusnya)
 */
app.get('/ab+cd', function (req, res) {
   res.send('ab+cd')
})

/* 
jalur route akan cocok dengan:
- baseurl/abcd
- baseurl/ abxcd
- baseurl/ abRANDOMcd
- baseurl/ ab123cd
- and so on
 */
app.get('/ab*cd', function (req, res) {
   res.send('ab*cd')
})

/* 
jalur route akan cocok dengan:
- baseurl/abef
- baseurl/abcdef
 */
app.get('/ab(cd)?ef', function (req, res) {
   res.send('/ab(cd)?ef')
})

/* ----------------------route path regular expression------ */

/* 
route path akan cock dengan apapun yg memiliki "x" 
*/
app.get(/x/, function (req, res) {
   res.send('/x/')
})

/* 
route path akan cocok dengan butterfly dan dragonfily
tapi tidak cocok dengan butterflyman, dragonflyman dan seterusnya
 */
app.get(/.*fly$/, function (req, res) {
   res.send('/.*fly$/')
})

/* 
----------------- route parameter -------------- 
router parameter merupakan route untuk menangkap nilai yg dikirim melalui URL
nilai yg ditangkap, akan dimasukkan req.params

** parameter hanya bisa menggunakan huruf a-z A-Z, angka 0-9 dan simbol ("_") underscore 

syntax route parameter: app.get(':parameter', callback)
*/

/* 
note:       :userId dan :bookId (route path) akan menjadi key
            sedangkan nilai 5 dan 4 (Request URL) akan menjadi value
hasilnya:   {"key": "value"}
            {"userId": "5", "bookId": "4"}

Route path: /users/:userId/book/:bookId 
Roquest URL: /users/5/book/4
isi req.params: {"userId": "5", "bookId": "4"}
*/
app.get('/users/:userId/book/:bookId', function (req, res) {
   res.send(req.params)
})

/* 
penggunaan simbol  hypen(-) dan dot (.) 
*/

/*
contoh penggunaan (-)

route path: /penerbangan/:dari-:tujuan
request url: /penerbangan/jakarta-makassar
req.params: {"dari": "jakarta", "tujuan": "makassar"}
*/

app.get('/penerbangan/:dari-:tujuan', function (req, res) {
   res.send(req.params)
})

/*
contoh penggunaan (.)

route path: /kendaraan/:mobil.:plat_nomor
request url: /kendaraan/avanza-dd1234yy
req.params: {"mobil": "avanza", "plat_nomor": "dd1234yy"}
*/

app.get('/kendaraan/:mobil.:plat_nomor', function (req, res) {
   res.send(req.params)
})

/* 
-------------------- Route Handler -----------------------

- Kita dapat menyediakan multiple callback (lebih dari satu callback) yang berperilaku seperti midleware
- kita dapat menggunakan route handle sebagai prasyarat untuk mengakses fungsi tertentu pada aplikasi
   seperti validasi, autentikasi, dan autorisasi
- Penanganan route dapat berupa function, array of function atau kombinasi keduanya

*/

// Contoh request handler 
app.get('/user', function (req, res, next) {
   console.log('lanjutkan ke fuction berikutnya menggunakan function next()')
   next()
}, function (req, res) {
   res.send('Halo dari function ke-2')
})

// contoh penggunaan array of function
let callback1 = function name(req, res, next) {
   console.log('calback pertama')
   next()
}

let callback2 = function name(req, res, next) {
   console.log('calback kedua')
   next()
}

let callback3 = function name(req, res) {
   res.send('Halo dari callback ke-3')
}

app.get('/pengguna', [callback1, callback2, callback3])


// kombinasi dari array of function dan function
let fungsi1 = function (req, res, next) {
   console.log('Fungsi 1')
   next()
}

let fungsi2 = function (req, res, next) {
   console.log('Fungsi 2')
   next()
}

app.get('/kombinasi', [fungsi1, fungsi2], function (req, res) {
   res.send('kombinasi array of function dan function independent')
})

// contoh kasus validasi user
const validasiUser = function (req, res, next) {
   if (req.params.user === 'zaenal') next()
   else res.send('Anda bukan user')
}

app.get('/validasi/:user', validasiUser, function (req, res) {
   res.send(`Halo ${req.params.user}`)
})

/* 
---------------------- app.route ------------------------------ 
untuk membuat route chainable (route berantai), karena jalur ditentukan disatu route path yg sama
sehingga membuat rute menjadi medular, seperti mengurangi redudansi dan salah ketik
*/

app.route('/buku')
   .get(function (req, res) {
      res.send('Menampilkan daftar buku')
   })
   .post(function (req, res) {
      res.send('Menambah data buku')
   })
   .put(function (req, res) {
      res.send('Edit data buku')
   })
   .delete(function (req, res) {
      res.send('Hapus data buku')
   })







app.listen(3000, () => console.log('server running on http://localhost:3000'))