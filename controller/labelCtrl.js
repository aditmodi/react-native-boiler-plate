import Label from '../models/labels';
import { identity } from './controller';

export const addLabel = (req, res) => {
  if(req.body.id !== null && req.body.label !== null && req.body.latitude !== null && req.body.longitude !== null){
    if (identity.equals(req.body.id) == true){
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
    else {
      res.json({
        success: false,
        message: 'Wrong userId'
      })
    }
  }
  else {
    res.json({
      success: false,
      message: 'Incomplete body'
    })
  }
}
