import { Document, Model, model, Schema } from 'mongoose';
import * as random from 'mongoose-random';

const wordSchema: Schema = new Schema({
  original: String,
  translation: String
});

wordSchema.plugin(random, { path: 'r' });

interface IWord extends Document {
  original: string;
  translation: string;
}

interface WordModel extends Model<IWord> {
  findRandom();
}

const Word: WordModel = model<IWord>('Word', wordSchema) as WordModel;

export { Word };

