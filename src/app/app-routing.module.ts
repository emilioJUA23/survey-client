import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ResultsDisplayComponent }      from './results-display/results-display.component';
import { SurveyEditorComponent} from './survey.editor.component';
import { SurveyEditorWrapperComponent} from './survey-editor-wrapper/survey-editor-wrapper.component';
import { SurveyComponent} from './survey.component';
import { SurveyWrapperComponent} from './survey-wrapper/survey-wrapper.component';
const routes: Routes = [
  { path: 'results', component: ResultsDisplayComponent },
  { path: 'editor', component: SurveyEditorWrapperComponent },
  { path: 'survey', component: SurveyWrapperComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
