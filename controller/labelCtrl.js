import Label from '../models/labels';

export const addLabel = (req, res) => {
  let label = new Label();
  label.userId = req.body.id;
  label.label = req.body.label;
  label.coord.latitude = req.body.latitude;
  label.coord.longitude = req.body.longitude;
  label.save((err) => {
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
