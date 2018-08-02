var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  cover: {
    type: String
  },
  author: [{
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'user'
  }]
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});


var Article = mongoose.model('Article', articleSchema);

module.exports = Article
