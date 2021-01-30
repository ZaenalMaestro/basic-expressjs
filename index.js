const express = require('express'),
   app = express()

/* ----------------- app.router ------------------------ 
app.router: untuk membuat router menjadi modular atau dijadikan modul difile terpisah
untuk mempermudah dalam mengolola kode aplikasi jika aplikasi telah memiliki banyak fitur

- buat folder routes
-buat file karyawanRoute.js dan managerRoute.js di folder routes
-buat file routes.js untuk meload semua routes
-panggil module router pada file routes.js kedalam file index.js
*/

// load semua routes
const router = require('./routes/router')
app.use(router)

app.listen(3000)
console.log('server running on port 3000')