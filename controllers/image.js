
const Clarifai = require('clarifai');
const { json } = require('body-parser');

const app = new Clarifai.App({
    apiKey: '1b1d9202889642e28de3eb682f8a9792'
   });

   const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input )
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API' ))
   }

module.exports = {
    handleApiCall
}


const handleImage = (req, res, db) => {
    const {id} =req.body
    db('users').where('id','=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
handleImage: handleImage,
handleApiCall: handleApiCall
}