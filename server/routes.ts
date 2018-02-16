import * as express from 'express';

import { WordCtrl } from './controllers';
import { Word } from './models';

export default function setRoutes(app) {
  const router = express.Router();
  const wordCtrl = new WordCtrl();

  router
    .route('/words')
    .get(wordCtrl.getAll)
    .post(wordCtrl.create);

  router
    .route('/words/:id')
    .put(wordCtrl.update)
    .delete(wordCtrl.delete);

  app.use('/api', router);
}
