import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Word } from '../shared/models';

@Injectable()
export class DictionaryService {
  constructor(private http: HttpClient) {}

  getWords(random: boolean = false, page: number = 1, perPage: number = 10): Observable<{items: Word[], total: number}> {
    const skip = perPage * (page - 1);

    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', perPage.toString())
      .set('random', random.toString());

    return this.http.get<{items: Word[], total: number}>('/api/words', { params });
  }

  addWord(word: Word): Observable<Word> {
    return this.http.post<Word>('/api/words', word);
  }

  editWord(word: Word): Observable<string> {
    return this.http.put(`/api/words/${word._id}`, word, { responseType: 'text' });
  }

  deleteWord(word: Word): Observable<string> {
    return this.http.delete(`/api/words/${word._id}`, { responseType: 'text' });
  }
}
