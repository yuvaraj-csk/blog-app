const express = require('express')
const router = express.Router()
const {addNews, getNews, updateNews, deleteNews} = require('../controllers/newsController')
const {validateId} = require('../controllers/idValidator')

router.route('/').post(addNews).get(getNews).patch(updateNews).delete(deleteNews)
router.route('/validate').post(validateId)

module.exports = router