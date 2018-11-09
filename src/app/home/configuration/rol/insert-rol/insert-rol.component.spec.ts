import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertRolComponent } from './insert-rol.component';

describe('InsertRolComponent', () => {
  let component: InsertRolComponent;
  let fixture: ComponentFixture<InsertRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
