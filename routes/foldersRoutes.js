'use strict'
const express = require('express')
const folders = require('../controllers/foldersControllers')
const router = express.Router()

router.get(`/api/v1/folders`,  folders.index)
router.post(`/api/v1/folders`, folders.store)
// router.get(`/api/v1/folders/:id`,  folders.show)
// router.put(`/api/v1/folders/:id`, folders.update)
// router.delete(`/api/v1/folders/:id`, folders.destroy)

module.exports = router