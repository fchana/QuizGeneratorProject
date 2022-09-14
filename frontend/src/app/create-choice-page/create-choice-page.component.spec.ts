import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChoicePageComponent } from './create-choice-page.component';

describe('CreateChoicePageComponent', () => {
  let component: CreateChoicePageComponent;
  let fixture: ComponentFixture<CreateChoicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateChoicePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateChoicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
