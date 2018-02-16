import { Request, Response } from 'express';

export abstract class BaseCtrl {
  abstract model: any;

  // Get all
  getAll = async (req: Request, res: Response) => {
    try {
      const docs = await this.model.find({});
      return res.status(200).json(docs);
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }
  }

  // Count all
  count = async (req: Request, res: Response) => {
    try {
      const count = await this.model.count({});
      return res.status(200).json(count);
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }
  }

  // Insert
  create = async (req: Request, res: Response) => {
    try {
      const obj = new this.model(req.body);
      const item = await obj.save();
      return res.status(200).json(item);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({
          message: err.message
        });
      }

      return res.status(500).json({
        message: err.message
      });
    }
  }

  // Get by id
  read = async (req: Request, res: Response) => {
    try {
      const item = await this.model.findOne({ _id: req.params.id });
      return res.status(200).json(item);
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }
  }

  // Update by id
  update = async (req: Request, res: Response) => {
    try {
      await this.model.findOneAndUpdate({ _id: req.params.id }, req.body);
      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }
  }

  // Delete by id
  delete = async (req: Request, res: Response) => {
    try {
      await this.model.findOneAndRemove({ _id: req.params.id });
      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }
  }
}
