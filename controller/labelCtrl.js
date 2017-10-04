let Label = require('../models/labels');

exports.addLabel = function(req, res){
  console.log("BODY>>", req.body);
  let label = new Label();
  label.email = req.body.email;
  label.label = req.body.label;
  label.coord.latitude = req.body.latitude;
  label.coord.longitude = req.body.longitude;
  label.save(function(err){
    if(err){
      return res.send(err);
    }
    else {
      return res.json({
        status: 'ok'
      })
    }
  })
}
