import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChoicePageComponent } from './edit-choice-page.component';

describe('EditChoicePageComponent', () => {
  let component: EditChoicePageComponent;
  let fixture: ComponentFixture<EditChoicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditChoicePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditChoicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
