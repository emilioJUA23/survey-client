import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyEditorWrapperComponent } from './survey-editor-wrapper.component';

describe('SurveyEditorWrapperComponent', () => {
  let component: SurveyEditorWrapperComponent;
  let fixture: ComponentFixture<SurveyEditorWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyEditorWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyEditorWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
