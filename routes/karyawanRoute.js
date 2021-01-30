const express = require('express'),
   router = express.Router()

router.get('/', function (req, res) {
   res.send('Route halaman karyawan')
})

router.post('/', function (req, res) {
   res.send('Route edit data karyawan')
})

module.exports = router