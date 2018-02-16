import { promisify } from 'bluebird';
import { Request, Response } from 'express';

import { Word } from '../models';
import { BaseCtrl } from './base';

export class WordCtrl extends BaseCtrl {
  model = Word;

  getAll = async (req: Request, res: Response) => {
    try {
      const { skip, limit, random } = req.query;
      let total, result;

      if (random) {
        result = await this.model.findRandom().limit(20);
        total = result.length;
      } else {
        total = await this.model.count({});
        result = await this.model.find({}).limit(limit).skip(skip);
      }

      res.json({
        total,
        items: result
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }
  }
}
