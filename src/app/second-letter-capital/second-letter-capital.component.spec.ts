import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SecondLetterCapitalComponent } from './second-letter-capital.component';

describe('SecondLetterCapitalComponent', () => {
  let component: SecondLetterCapitalComponent;
  let fixture: ComponentFixture<SecondLetterCapitalComponent>;

  beforeEach(waitForAsync(() => {
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
