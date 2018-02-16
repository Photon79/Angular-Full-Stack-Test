import { Component, OnInit } from '@angular/core';
import { without } from 'lodash/array';

import { Word } from '../../shared/models';
import { DictionaryService, StorageService } from '../../services';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent {
  question = 1;
  public showResult = false;
  public questions: Array<Word> = [];

  answer: string = null;
  current: Word = new Word();

  constructor(
    private dictionary: DictionaryService,
    private storage: StorageService
  ) {
    this.questions = this.storage.load('questions') || [];

    if (!this.questions.length) {
      this.getData();
    } else {
      this.showResult = this.storage.load('complete') || false;
      this.question = this.storage.load('question');
      this.current = this.questions[this.question - 1];
    }
  }

  getData() {
    this.question = 1;

    this.dictionary.getWords(true).subscribe(data => {
      this.questions = data.items.map(word => {
        const shuffled = without(this.shuffle(data.items), word);

        word.answers = this.shuffle([
          word.translation,
          ...shuffled.slice(0, 5).map(item => item.translation)
        ]);

        return word;
      });

      if (this.questions.length) {
        this.storage.save({
          questions: this.questions,
          question: this.question
        });

        this.current = this.questions[this.question - 1];
      }
    });
  }

  next() {
    if (!this.answer) { return; }

    const answers = this.storage.load('answers') || [];

    if (this.question <= this.questions.length) {
      answers.push({
        question: this.question,
        result: this.answer
      });

      this.storage.save({ answers });
      this.answer = null;
      this.question++;

      if (this.question <= this.questions.length) {
        this.current = this.questions[this.question - 1];
        this.storage.save({ question: this.question });
      }
    }

    if (this.question > this.questions.length) {
      this.showResult = true;
      this.storage.save({ complete: true });
    }
  }

  getResults() {
    const answers = this.storage.load('answers');
    let correct = 0;

    answers.forEach(item => {
      console.log(this.questions[item.question - 1].translation, item.result);
      if (this.questions[item.question - 1].translation === item.result) {
        correct++;
      }
    });

    return {
      rate: Math.floor(100 / this.questions.length * correct),
      count: correct
    };
  }

  clear() {
    this.storage.clear();
    this.getData();
    this.showResult = false;
  }

  private shuffle(arr) {
    const shuffled = arr.slice()
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

    return shuffled;
  }
}
