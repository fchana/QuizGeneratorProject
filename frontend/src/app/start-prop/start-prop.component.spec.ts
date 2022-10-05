import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPropComponent } from './start-prop.component';

describe('StartPropComponent', () => {
  let component: StartPropComponent;
  let fixture: ComponentFixture<StartPropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartPropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
