'use strict'
const express = require('express')
const documents = require('../controllers/documentController')
const router = express.Router()

router.get(`/api/v1/documents`,  documents.index)
router.post(`/api/v1/documents`, documents.store)
router.get(`/api/v1/documents/:id`,  documents.show)
router.put(`/api/v1/documents/:id`, documents.update)
router.delete(`/api/v1/documents/:id`, documents.destroy)

module.exports = router