import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPropPageComponent } from './edit-prop-page.component';

describe('EditPropPageComponent', () => {
  let component: EditPropPageComponent;
  let fixture: ComponentFixture<EditPropPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPropPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPropPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
