import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePropPageComponent } from './create-prop-page.component';

describe('CreatePropPageComponent', () => {
  let component: CreatePropPageComponent;
  let fixture: ComponentFixture<CreatePropPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePropPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePropPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
