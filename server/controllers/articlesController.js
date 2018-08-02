const Article = require('../models/article')

class ArticleController {
  static addArticle(req, res){
    Article.create({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      author: req.body.author
    })
    .then(user=>{
      res.status(200).json(user)
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static getArticles(req, res){
    Article.find({)
    .then(articles=>{
      res.status(200).json(articles)
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static getOneArticle(req, res){
    Article.findOne({ _id: req.params.id })
    .then(article=>{
      res.status(200).json(article)
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static deleteArticle(req, res){
    Article.deleteOne({ _id: req.params.id })
    .then(result=>{
      res.status(200).json('article successfully deleted')
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static updateArticle(req, res){
    Article.updateOne({ _id: req.params.id },{
      title: req.body.title,
      content: req.body.content,
      writter: req.body.writter
    })
    .then(update=>{
      res.status(200).json('article successfully updated')
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static getByCategory(req, res){
    Article.find({ category: req.body.category })
    .then(articles=>{
      res.status(200).json(articles)
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
}

module.exports = ArticleController
