# # Middleware Express js

### Pengertian middleware
Middleware merupakan `gerbang` antara request user dengan aplikasi, kalau dianalogikan jika seseorangan ingin menonton pertandingan sepak bola distadion maka penonton akan harus melewati gerbang maka gerbang akan menjadi middleware

digerbang ini kita dapat mengecek jika penonton memiliki tiket, maka dipersilahkan masuk kedalam stadion jika tidak maka tidak boleh masuk 

nah itu contoh sederhana dari middleware dikehidupan nyata. Web Framerwork saat ini kebanyakan telah disediakan middleware, dengan menggunakan middleware kita dapat melakukan:
- validasi
- autentikasi
- authorisasi

### Middleware Express js
Middleware express js merupakan fungsi yang dapat mengakses semua object request `req` atau response `res`, midlware dapat menjalankan tugas berikut:
- menjalankan `function` apapun
- mengubah objeck `req` dan `res`
- mengakhiri request yang masuk
- meneruskan ke middleware yang lain

berikut ini cara membuat middleware
``` javascript
function namaFungsiMiddleware(req, res, next){
   ...
   next()
}
```
perhatikan argument `next`, argument ini merupakan `callback` yang berfungsi sebagai middleware, dengan menjalankan `next` kita dapat melanjutkan ke middleware yang lain

 jika kita tidak menjalankan callback `next` maka request akan berhenti di middleware, seperti analogi diawal jika callback `next` tidak dijalankan maka gerban stadion tidak akan dibuka sehingga penonton tidak bisa masuk

kita akan coba membuat middlware mencatat penonton yang masuk, buat file `belajar-middleware.js`
```javascript
// import module express
const express = require('express')
const app = express()

// buat middleware
const catatPenontonMasuk = function (req, res, next) {
   console.log('Ada penonton yang masuk stadion...')
   next()
}

// route
app.get('/penonton', function(req, res) {
   res.send('Selamat datang distadion Gelora Bung karno')
})

// server berjalan diport 3000
app.listen(3000)
console.log('server berjalan diport http://localhost:3000')

```
buka terminal ketik `node belajar--middleware`

![terminal](D:/BELAJAR-EXPRESSJS/basic-express/middleware-expressjs/img/terminal.png)


kemudian buka browser kemudian ketikkan di address bar `localhost:3000/penonton` maka hasilnya sebagai berikut

![terminal](D:/BELAJAR-EXPRESSJS/basic-express/middleware-expressjs/img/browser.png)

lihat kembali dibrowser akan tampil pesan yang telah kita buat dimiddleware

![terminal](D:/BELAJAR-EXPRESSJS/basic-express/middleware-expressjs/img/output-terminal.png)



