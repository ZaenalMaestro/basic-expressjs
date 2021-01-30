const express = require('express'),
   router = express.Router()

router.get('/', function (req, res) {
   res.send('Route halaman manager')
})

router.post('/', function (req, res) {
   res.send('Route edit data manager')
})

module.exports = router