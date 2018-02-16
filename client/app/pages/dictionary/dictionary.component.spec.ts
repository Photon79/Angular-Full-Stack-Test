import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsModalModule } from 'ng2-bs3-modal';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DictionaryComponent } from './dictionary.component';
import { DictionaryService } from '../../services';

describe('DictionaryComponent', () => {
  let component: DictionaryComponent;
  let fixture: ComponentFixture<DictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxPaginationModule,
        BsModalModule,
        ModalModule.forRoot(),
        BootstrapModalModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ DictionaryComponent ],
      providers: [ DictionaryService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the string "Словарь" in h3', () => {
    const el = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(el.textContent).toContain('Словарь');
  });
});
