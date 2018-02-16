import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

import { DictionaryService } from '../../services';
import { Word } from '../../shared/models';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DictionaryComponent implements OnInit {
  @ViewChild('modal') modal: BsModalComponent;

  editMode = false;
  items: Array<Word> = [];
  selectedWord: Word = new Word();
  total: number;

  page = 1;
  pageSize = 20;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dictionary: DictionaryService,
    private modalService: Modal
  ) {}

  ngOnInit() {
    this.getWords();
  }

  pageChanged(page) {
    this.page = page;
    this.getWords();
  }

  add() {
    this.selectedWord = new Word();
    this.editMode = false;
    this.modal.open();
  }

  edit(item) {
    this.selectedWord = item;
    this.editMode = true;
    this.modal.open();
  }

  delete(word) {
    const modalRef = this.modalService
      .confirm()
      .title('Удаление слова')
      .body(`Вы уверены, что хотите удалить слово <strong>${word.original}</strong>`)
      .open();

    modalRef.result
      .then(result => {
        if (result) {
          this.dictionary
            .deleteWord(word)
            .subscribe(() => {
              this.getWords();
            });
        }
      })
      .catch(err => false);
  }

  closed() {
    const func: any = this.editMode ?
      this.dictionary.editWord.bind(this.dictionary) :
      this.dictionary.addWord.bind(this.dictionary);

    func(this.selectedWord).subscribe(() => {
      this.getWords();
    });
  }

  dismissed(type) {
    if (this.editMode) {
      this.getWords();
    } else {
      this.selectedWord = new Word();
    }
  }

  getWords() {
    this.dictionary
      .getWords(false, this.page, this.pageSize)
      .subscribe(data => {
        this.items = data.items;
        this.total = data.total;
      });
  }
}
