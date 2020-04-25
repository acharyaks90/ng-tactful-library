import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondLetterCapitalComponent } from './second-letter-capital.component';

describe('SecondLetterCapitalComponent', () => {
  let component: SecondLetterCapitalComponent;
  let fixture: ComponentFixture<SecondLetterCapitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondLetterCapitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondLetterCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
