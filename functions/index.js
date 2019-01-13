const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

function init() {
    try {
        admin.initializeApp();
      } catch (e) {}
}

exports.addPost = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        init();
        admin.database().ref('posts').push({
            id: request.body.id || null,
            title: request.body.title || null,
            location: request.body.location || null,
            image: request.body.image || null,
        }).then(function() {
            response.status(200).json({
                message: 'Post has been added successfully',
                id: request.body.id
            })
        }).catch(function(error) {
            response.status(500).json({
                message: 'Error',
                error: error
            })
        })
    })
})
