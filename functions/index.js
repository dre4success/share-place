const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const UUID = require('uuid-v4');

const gcconfig = {
  projectId: 'places-awesome-1515590111232',
  keyFileName: 'places-awesome.json'
};
const gcs = require('@google-cloud/storage')(gcconfig);
admin.initializeApp({
  credential: admin.credential.cert(require('./places-awesome.json'))
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')
    ) {
      console.log('No token present');
      res.status(403).json({ error: 'Unauthorized' });
      return;
    }
    let idToken = req.headers.authorization.split('Bearer ')[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        const body = JSON.parse(req.body);
        fs.writeFileSync(
          '/tmp/uploaded-image.jpg',
          body.image,
          'base64',
          err => {
            console.log(err);
            return res.status(500).json({ error: err });
          }
        );
        const bucket = gcs.bucket('places-awesome-1515590111232.appspot.com');

        const uuid = UUID();

        bucket.upload(
          '/tmp/uploaded-image.jpg',
          {
            uploadType: 'media',
            destination: '/places/' + uuid + '.jpg',
            metadata: {
              metadata: {
                contentType: 'image/jpeg',
                firebaseStorageDownloadTokens: uuid
              }
            }
          },
          (err, file) => {
            if (!err) {
              res.status(201).json({
                imageUrl:
                  'https://firebasestorage.googleapis.com/v0/b/' +
                  bucket.name +
                  '/o/' +
                  encodeURIComponent(file.name) +
                  '?alt=media&token=' +
                  uuid
              });
            } else {
              console.log(err);
              res.status(500).json({ error: err });
            }
          }
        );
      })
      .catch(err => {
        console.log('Token is invalid');
        res.status(403).json({ error: 'Unauthorized' });
      });
  });
});
