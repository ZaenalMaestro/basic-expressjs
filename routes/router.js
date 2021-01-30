const express = require('express'),
   router = express.Router()

router.use('/karyawan', require('./karyawanRoute'))
router.use('/manager', require('./managerRoute'))

module.exports = router
