import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyVersioningComponent } from './survey-versioning.component';

describe('SurveyVersioningComponent', () => {
  let component: SurveyVersioningComponent;
  let fixture: ComponentFixture<SurveyVersioningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyVersioningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyVersioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
