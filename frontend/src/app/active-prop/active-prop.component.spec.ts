import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePropComponent } from './active-prop.component';

describe('ActivePropComponent', () => {
  let component: ActivePropComponent;
  let fixture: ComponentFixture<ActivePropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivePropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivePropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
