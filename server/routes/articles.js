var express = require('express');
var router = express.Router();
var ArticleController = require('../controllers/articlesController')

/* GET articles listing. */
router.get('/', ArticleController.getArticles)
router.post('/', ArticleController.addArticle)
router.get('/:id', ArticleController.getOneArticle)
router.delete('/:id', ArticleController.deleteArticle)
router.put('/:id', ArticleController.updateArticle)
router.post('/category', ArticleController.getByCategory)

module.exports = router;
