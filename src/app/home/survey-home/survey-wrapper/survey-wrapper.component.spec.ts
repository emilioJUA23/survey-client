import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyWrapperComponent } from './survey-wrapper.component';

describe('SurveyWrapperComponent', () => {
  let component: SurveyWrapperComponent;
  let fixture: ComponentFixture<SurveyWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
