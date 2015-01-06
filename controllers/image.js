var fs = require('fs'),
    path = require('path'),
    sidebar = require('../helpers/sidebar');


var viewModel = {
  image: {
    uniqueId:     1,
    title:        'Sample Image 1',
    description:  '',
    filename:     'sample1.jpg',
    views:        0,
    likes:        0,
    timestamp:    Date.now
  },

  comments: [
    {
      image_id: 1,
      email: 'test@testing.com',
      name: 'Test Tester',
      gravatar: 'http://lorempixel.com/75/75/animals/1',
      comment: 'This is a test comment...',
      timestampe: Date.now()
    },
    {
      image_id: 1,
      email: 'test@testing.com',
      name: 'Test Tester',
      gravatar: 'http://lorempixel.com/75/75/animals/1',
      comment: 'This is a test comment...',
      timestampe: Date.now()
    }
  ]
};



module.exports = {

  index: function(req, res) {
    sidebar(viewModel, function(viewModel) {
      res.render('image', viewModel);
    });
  },

  create: function(req, res) {

    var saveImage = function() {
        var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
        imgUrl = '';

        for(var i=0; i<6; i++) {
          imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        var tempPath = req.files.file.path,
            ext = path.extname(req.files.file.name).toLowerCase(),
            targetPath = path.resolve('./public/upload' + imgUrl + ext);

        if( ['.png', '.jpg', '.jpeg', '.gif'].indexOf(ext) >= 0 ) {
          fs.rename(tempPath, targetPath, function(err) {
            if(err) throw err;
            res.redirect('/images/99');
          });
        } else {
          fs.unlink(tempPath, function() {
            if(err) throw err;

            res.json(500, {error: 'Only image files are allowed.'});
          });
        }

    }

    saveImage();
  },

  like: function(req, res) {
    res.json({likes: 1});
  },

  comment: function(req, res) {
    res.send('The image:comment POST controller');
  }
}






























//
