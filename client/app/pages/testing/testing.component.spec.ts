import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TestingComponent } from './testing.component';
import { DictionaryService, StorageService } from '../../services';

describe('TestingComponent', () => {
  let component: TestingComponent;
  let fixture: ComponentFixture<TestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [ TestingComponent ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        DictionaryService,
        StorageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingComponent);
    console.log('fixture', fixture);
    component = fixture.componentInstance;
    console.log('component', component);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the string "Тестирование" in h3', () => {
    const el = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(el.textContent).toContain('Тестирование');
  });

  it('should display the string "Результаты тестирования" in h3', () => {
    component.showResult = true;
    const el = fixture.debugElement.query(By.css('h3')).nativeElement;

    if (component.questions.length) {
      expect(el.textContent).toContain('Результаты тестирования');
    } else {
      expect(el.textContent).toContain('Тестирование');
    }
  });
});
