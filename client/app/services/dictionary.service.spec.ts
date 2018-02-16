import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DictionaryService } from './dictionary.service';

describe('DictionaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ DictionaryService ]
    });
  });

  it('should be created', inject([DictionaryService], (service: DictionaryService) => {
    expect(service).toBeTruthy();
  }));
});
